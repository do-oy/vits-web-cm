/**
 * Returns available voice IDs by scanning /models/ directory.
 * This does not include HuggingFace metadata.
 */
export declare function voices(): Promise<string[]>;
