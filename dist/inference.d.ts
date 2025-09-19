import { InferenceConfig, ProgressCallback, InferenceResult } from './types';

export declare function predict(config: InferenceConfig, callback?: ProgressCallback): Promise<InferenceResult>;
