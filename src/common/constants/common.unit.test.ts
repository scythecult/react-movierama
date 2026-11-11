import { existsSync } from 'node:fs';
import path from 'node:path';
import {
  BASE_DIR,
  CLIENT_DIST_DIR,
  CLIENT_ENTRY_SOURCE_DIR,
  CLIENT_SOURCE_DIR,
  CLIENT_TEMPLATE_PATH,
  INDEX_HTML_PATH,
  SERVER_ENTRY_PATH,
  SRC_DIR,
} from './common';

describe('project paths', () => {
  test('should resolve source, build output, and the html template from the repository root', () => {
    expect(CLIENT_SOURCE_DIR).toBe(path.join(SRC_DIR, 'client'));
    expect(CLIENT_ENTRY_SOURCE_DIR).toBe(path.join(CLIENT_SOURCE_DIR, 'app/entrypoint'));
    expect(CLIENT_DIST_DIR).toBe(path.join(BASE_DIR, 'dist/client'));
    expect(CLIENT_TEMPLATE_PATH).toBe(path.join(CLIENT_DIST_DIR, 'index.html'));
    expect(SERVER_ENTRY_PATH).toBe(path.join(BASE_DIR, 'dist/server/entryServer.js'));
    expect(INDEX_HTML_PATH).toBe(path.join(BASE_DIR, 'index.html'));
    expect(existsSync(INDEX_HTML_PATH)).toBe(true);
    expect(existsSync(CLIENT_ENTRY_SOURCE_DIR)).toBe(true);
  });
});
