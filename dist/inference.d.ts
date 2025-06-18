import { InferenceConfg, ProgressCallback } from './types';

export declare function predict(config: InferenceConfg, callback?: ProgressCallback): Promise<Blob>;
