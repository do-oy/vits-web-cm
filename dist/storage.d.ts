import { ProgressCallback } from './types';

/**
 * Prefetch a model for later use
 */
export declare function download(modelId: string, callback?: ProgressCallback): Promise<void>;
/**
 * Remove a model from opfs
 */
export declare function remove(modelId: string): Promise<void>;
/**
 * Get all stored models
 */
export declare function stored(): Promise<string[]>;
/**
 * Delete the models directory
 */
export declare function flush(): Promise<void>;
