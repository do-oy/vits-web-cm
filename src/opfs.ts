export async function writeBlob(path: string, blob: Blob): Promise<void> {
	try {
		const root = await navigator.storage.getDirectory();
		const dir = await root.getDirectoryHandle('piper', { create: true });

		const fileName = path.split('/').pop()!;
		const file = await dir.getFileHandle(fileName, { create: true });
		const writable = await file.createWritable();
		await writable.write(blob);
		await writable.close();
	} catch (e) {
		console.error('[OPFS] Write error:', e);
	}
}

export async function readBlob(path: string): Promise<Blob | undefined> {
	try {
		const root = await navigator.storage.getDirectory();
		const dir = await root.getDirectoryHandle('piper', { create: true });

		const file = await dir.getFileHandle(path);
		return await file.getFile();
	} catch {
		return undefined;
	}
}

export async function removeBlob(path: string): Promise<void> {
	try {
		const root = await navigator.storage.getDirectory();
		const dir = await root.getDirectoryHandle('piper');
		await dir.removeEntry(path);
	} catch (e) {
		console.error('[OPFS] Remove error:', e);
	}
}

export async function listBlobs(): Promise<string[]> {
	const root = await navigator.storage.getDirectory();
	const dir = await root.getDirectoryHandle('piper', { create: true });

	const files: string[] = [];

	// @ts-ignore
	for await (const name of dir.keys()) {
		files.push(name);
	}

	return files;
}

export async function clearBlobs(): Promise<void> {
	const root = await navigator.storage.getDirectory();
	const dir = await root.getDirectoryHandle('piper', { create: true });

	// @ts-ignore
	for await (const name of dir.keys()) {
		await dir.removeEntry(name);
	}
}
