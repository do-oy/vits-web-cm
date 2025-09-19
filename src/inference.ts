import { InferenceConfig, ProgressCallback, InferenceResult } from './types';
import { ONNX_BASE, WASM_BASE } from './fixtures';
import { readBlob, writeBlob } from './opfs';
import { fetchBlob } from './http.js';
import { pcm2wav } from './audio';

let module: typeof import('./piper.js');
let ort: typeof import('onnxruntime-web');

// Кэш моделей из models.json
let modelsIndex: any[] | null = null;

async function getModelsIndex(): Promise<any[]> {
	if (!modelsIndex) {
		const res = await fetch('/models/models.json');
		modelsIndex = await res.json();
	}
	return modelsIndex!;
}

async function getModelFilePath(voiceId: string, ext: string): Promise<string> {
	// ext: '.onnx' или '.onnx.json'
	const models = await getModelsIndex();
	const model = models.find((m: any) => m.id === voiceId);
	if (!model) throw new Error(`Model ${voiceId} not found in models.json`);
	return `/models/${voiceId}/${voiceId}${ext}`;
}

export async function predict(config: InferenceConfig, callback?: ProgressCallback): Promise<InferenceResult> {
	module = module ?? (await import('./piper.js'));
	ort = ort ?? (await import('onnxruntime-web'));

	const voiceId = config.voiceId;
	const modelConfigPath = await getModelFilePath(voiceId, '.onnx.json');
	const modelPath = await getModelFilePath(voiceId, '.onnx');

	const modelConfigBlob = await getBlobOPFS(modelConfigPath, callback);
	const modelConfig = JSON.parse(await modelConfigBlob.text());
	let ipaPhonemes: string[] = [];

	let processedText = config.text;
	const input = JSON.stringify([{ text: processedText.trim() }]);

	ort.env.allowLocalModels = true;
	ort.env.wasm.numThreads = navigator.hardwareConcurrency;
	ort.env.wasm.wasmPaths = ONNX_BASE;

	// Build reverse phoneme_id_map: id (number) -> symbol
	const idToPhoneme: Record<string, string> = {};
	for (const [symbol, ids] of Object.entries(modelConfig.phoneme_id_map)) {
		for (const id of ids as number[]) {
			idToPhoneme[id] = symbol;
		}
	}

	const phonemeIds: string[] = await new Promise(async (resolve) => {
		const phonemizer = await module.createPiperPhonemize({
			print: (data: any) => {
				resolve(JSON.parse(data).phoneme_ids);
			},
			printErr: (message: any) => {
				throw new Error(message);
			},
			locateFile: (url: string) => {
				if (url.endsWith('.wasm')) return `${WASM_BASE}.wasm`;
				if (url.endsWith('.data')) return `${WASM_BASE}.data`;
				return url;
			},
		});

		phonemizer.callMain([
			'-l',
			modelConfig.espeak.voice,
			'--input',
			input,
			'--espeak_data',
			'/espeak-ng-data',
		]);
	});

	ipaPhonemes = phonemeIds.map(id => idToPhoneme[id] || id);

	const speakerId = 0;
	const sampleRate = modelConfig.audio.sample_rate;
	const noiseScale = modelConfig.inference.noise_scale;
	const lengthScale = modelConfig.inference.length_scale;
	const noiseW = modelConfig.inference.noise_w;

	const modelBlob = await getBlobOPFS(modelPath, callback);
	const session = await ort.InferenceSession.create(await modelBlob.arrayBuffer());

	const feeds = {
		input: new ort.Tensor('int64', phonemeIds, [1, phonemeIds.length]),
		input_lengths: new ort.Tensor('int64', [phonemeIds.length]),
		scales: new ort.Tensor('float32', [noiseScale, lengthScale, noiseW]),
	};

	if (Object.keys(modelConfig.speaker_id_map).length) {
		Object.assign(feeds, { sid: new ort.Tensor('int64', [speakerId]) });
	}

	const {
		output: { data: pcm },
	} = await session.run(feeds);

	return {
		audio: new Blob([pcm2wav(pcm as Float32Array, 1, sampleRate)], { type: 'audio/x-wav' }),
		phonemes: phonemeIds,
		ipa: ipaPhonemes
	};
}

// Загрузка blob: сначала из OPFS, если нет — скачиваем и сохраняем в OPFS
async function getBlobOPFS(path: string, callback?: ProgressCallback): Promise<Blob> {
	const opfsName = path.split('/').pop()!;
	let blob: Blob | undefined = await readBlob(opfsName);
	if (!blob) {
		blob = await fetchBlob(path, callback);
		await writeBlob(opfsName, blob);
	}
	return blob;
}
