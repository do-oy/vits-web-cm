import { ProgressCallback } from './types';

export async function fetchBlob(
	url: string,
	callback?: ProgressCallback
): Promise<Blob> {
	let res = await tryFetch(url);
	if (!res.ok && isHuggingFaceURL(url)) {
		const fallbackUrl = toFallbackURL(url);
		console.warn(`[vits-web] Fallback to: ${fallbackUrl}`);
		res = await tryFetch(fallbackUrl);
	}

	const reader = res.body?.getReader();
	const contentLength = +(res.headers.get('Content-Length') ?? 0);

	let receivedLength = 0;
	let chunks = [];
	while (true && reader) {
		const { done, value } = await reader.read();

		if (done) break;

		chunks.push(value);
		receivedLength += value.length;

		callback?.({
			url,
			total: contentLength,
			loaded: receivedLength,
		});
	}

	return new Blob(chunks, { type: res.headers.get('Content-Type') ?? undefined });
}

async function tryFetch(url: string): Promise<Response> {
	try {
		return await fetch(url);
	} catch (e) {
		console.warn(`[vits-web] Fetch failed: ${url}`);
		return new Response(null, { status: 404 });
	}
}

function isHuggingFaceURL(url: string): boolean {
	return url.includes('huggingface.co');
}

function toFallbackURL(url: string): string {
	const match = url.match(/models\/([^/]+)\/(model\.onnx(?:\.json)?)/);
	if (!match) return url;
	const [_, voiceId, file] = match;
	return `/models/${voiceId}.${file}`;
}
