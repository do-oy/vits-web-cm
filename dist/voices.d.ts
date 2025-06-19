import { Voice } from './types';

/**
 * Получить все доступные кастомные модели из /models/models.json
 */
export declare function voices(): Promise<Voice[]>;
