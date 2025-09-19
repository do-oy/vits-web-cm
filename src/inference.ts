import { InferenceConfig, ProgressCallback, InferenceResult } from './types';
import { ONNX_BASE, WASM_BASE } from './fixtures';
import { readBlob, writeBlob } from './opfs';
import { fetchBlob } from './http.js';
import { pcm2wav } from './audio';

let module: typeof import('./piper.js');
let ort: typeof import('onnxruntime-web');

export async function predict(config: InferenceConfig, callback?: ProgressCallback): Promise<InferenceResult> {
	module = module ?? (await import('./piper.js'));
	ort = ort ?? (await import('onnxruntime-web'));

	const basePath = `/models/${config.voiceId}`;
	const modelConfigBlob = await getBlob(`${basePath}.onnx.json`, callback);
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

	const modelBlob = await getBlob(`${basePath}.onnx`, callback);
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

async function getBlob(url: string, callback?: ProgressCallback): Promise<Blob> {
	let blob: Blob | undefined = await readBlob(url);
	if (!blob) {
		blob = await fetchBlob(url, callback);
		await writeBlob(url, blob);
	}
	return blob;
}
