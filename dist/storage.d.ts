import { ProgressCallback } from './types';

/**
 * prefetch model in OPFS (local from /models/{voiceId}.onnx nd .onnx.json)
 */
export declare function download(voiceId: string, callback?: ProgressCallback): Promise<void>;
/**
 * Remove model from OPFS
 */
export declare function remove(voiceId: string): Promise<void>;
/**
 * getting all models saved at OPFS
 */
export declare function stored(): Promise<string[]>;
/**
 * Full wipe OPFS
 */
export declare function flush(): Promise<void>;
