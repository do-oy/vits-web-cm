import { Voice } from './types';

/**
 * Получить все доступные кастомные модели из /models/models.json
 */
export async function voices(): Promise<Voice[]> {
	const res = await fetch('/models/models.json');
	if (!res.ok) {
		throw new Error('Не удалось получить список моделей');
	}
	return await res.json();
}
