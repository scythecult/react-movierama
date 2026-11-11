import { readFile } from 'node:fs/promises';

export const readTextFile = (filePath: string) => readFile(filePath, 'utf-8');
