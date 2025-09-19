import { fetchBlob } from './http';
import { removeBlob, writeBlob, listBlobs } from './opfs';
import { ProgressCallback } from './types';

/**
 * prefetch model in OPFS (local from /models/{voiceId}.onnx nd .onnx.json)
 */
export async function download(voiceId: string, callback?: ProgressCallback): Promise<void> {
	const urls = [`/models/${voiceId}.onnx`, `/models/${voiceId}.onnx.json`];

	await Promise.all(
		urls.map(async (url) => {
			const blob = await fetchBlob(url, url.endsWith('.onnx') ? callback : undefined);
			await writeBlob(url, blob);
		}),
	);
}

/**
 * Remove model from OPFS
 */
export async function remove(voiceId: string) {
	const urls = [`/models/${voiceId}.onnx`, `/models/${voiceId}.onnx.json`];
	await Promise.all(urls.map(removeBlob));
}

/**
 * getting all models saved at OPFS
 */
export async function stored(): Promise<string[]> {
	const files = await listBlobs();
	const models = new Set<string>();

	for (const file of files) {
		if (file.endsWith('.onnx') || file.endsWith('.onnx.json')) {
			models.add(file.replace('.onnx', '').replace('.json', ''));
		}
	}

	return [...models];
}

/**
 * Full wipe OPFS
 */
export async function flush() {
	try {
		const root = await navigator.storage.getDirectory();
		const dir = await root.getDirectoryHandle('tts^');
		// @ts-ignore
		await dir.remove({ recursive: true });
	} catch (e) {
		console.error('[OPFS] Flush error:', e);
	}
}
