import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));

export const BASE_DIR = path.join(CURRENT_DIR, '../../../');

export const SRC_DIR = path.join(BASE_DIR, 'src');

export const DIST_DIR = path.join(BASE_DIR, 'dist');

export const CLIENT_DIST_DIR = path.join(SRC_DIR, 'client');

export const SERVER_DIST_DIR = path.join(DIST_DIR, 'server');

export const CLIENT_ENTRY_SOURCE_DIR = path.join(CLIENT_DIST_DIR, 'app/entrypoint');
