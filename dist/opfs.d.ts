export declare function writeBlob(path: string, blob: Blob): Promise<void>;
export declare function readBlob(path: string): Promise<Blob | undefined>;
export declare function removeBlob(path: string): Promise<void>;
export declare function listBlobs(): Promise<string[]>;
export declare function clearBlobs(): Promise<void>;
