import { fetchBlob } from './http';
import { removeBlob, writeBlob } from './opfs';
import { ProgressCallback } from './types';

/**
 * Prefetch a model for later use
 */
export async function download(modelId: string, callback?: ProgressCallback): Promise<void> {
	const urls = [
		`/models/${modelId}/${modelId}.onnx`,
		`/models/${modelId}/${modelId}.onnx.json`
	];

	await Promise.all(
		urls.map(async (url) => {
			writeBlob(url, await fetchBlob(url, url.endsWith('.onnx') ? callback : undefined));
		})
	);
}

/**
 * Remove a model from opfs
 */
export async function remove(modelId: string) {
	const urls = [
		`/models/${modelId}/${modelId}.onnx`,
		`/models/${modelId}/${modelId}.onnx.json`
	];

	await Promise.all(urls.map((url) => removeBlob(url)));
}

/**
 * Get all stored models
 */
export async function stored(): Promise<string[]> {
	const root = await navigator.storage.getDirectory();
	const dir = await root.getDirectoryHandle('piper', {
		create: true,
	});
	const result: string[] = [];

	// @ts-ignore
	for await (const name of dir.keys()) {
		if (name.endsWith('.onnx')) {
			const key = name.split('.')[0];
			result.push(key);
		}
	}

	return result;
}

/**
 * Delete the models directory
 */
export async function flush() {
	try {
		const root = await navigator.storage.getDirectory();
		const dir = await root.getDirectoryHandle('piper'); // @ts-ignore
		await dir.remove({ recursive: true });
	} catch (e) {
		console.error(e);
	}
}
