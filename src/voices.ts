/**
 * Returns available voice IDs by scanning /models/ directory.
 * This does not include HuggingFace metadata.
 */
export async function voices(): Promise<string[]> {
	const res = await fetch('/models/');
	const text = await res.text();
	const files = [...text.matchAll(/href="([^"]+\.onnx\.json)"/g)].map((m) => m[1]);
	const ids = [...new Set(files.map((f) => f.replace(/\.onnx\.json$/, '')))];
	return ids;
}