export type InferenceConfg = {
	text: string;
	voiceId: string;
};

export type Progress = {
	url: string;
	total: number;
	loaded: number;
};

export type ProgressCallback = (progress: Progress) => void;
