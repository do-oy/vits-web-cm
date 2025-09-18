export type InferenceResult = {
	audio: Blob;
	phonemes: string[];
	ipa: string[];
};

export type InferenceConfig = {
	text: string;
	voiceId: string;
};

export type Progress = {
	url: string;
	total: number;
	loaded: number;
};

export type ProgressCallback = (progress: Progress) => void;
