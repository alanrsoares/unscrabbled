import { pipe, join, split, toLower, uniq } from 'rambda';

export const preventDefault = <T extends MouseEvent>(e: T) => e.preventDefault();

export const clamp = ({ max = Infinity, min = -Infinity }, value: number) => {
	return value < min ? min : value > max ? max : value;
};

export const toChars = pipe(toLower, split(''));

export const dedupeString = pipe(toChars, uniq, join(''));

export const sanitizePattern = (pattern: string, patternLength: number) =>
	pattern.toLowerCase().slice(0, patternLength).replaceAll(/\s/gi, '*');

export const toRgexp = (pattern: string) => new RegExp(`^${pattern.replaceAll('*', '\\w')}$`);
