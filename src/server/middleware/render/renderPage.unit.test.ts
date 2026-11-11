import type { Request } from 'express';
import { CLIENT_TEMPLATE_PATH } from '../../../common/constants/common';
import { Config } from '../../../common/env';
import { loadServerEntry } from './loadServerEntry.js';
import { readTextFile } from './readTextFile.js';
import { renderPage } from './renderPage';

const readTextFileFromDisk = vi.hoisted(() => {
  type ReadTextFile = (filePath: string) => Promise<string>;

  const isReadTextFile = (value: unknown): value is ReadTextFile => typeof value === 'function';

  const readOriginalTextFile = (loaded: unknown) => {
    if (typeof loaded !== 'object' || loaded === null || !('readTextFile' in loaded) || !isReadTextFile(loaded.readTextFile)) {
      throw new Error('readTextFile export is missing');
    }

    return loaded.readTextFile;
  };

  const holder: { current?: ReadTextFile } = {};

  return { holder, readOriginalTextFile };
});

vi.mock('./readTextFile.js', async (importOriginal) => {
  const readFromDisk = readTextFileFromDisk.readOriginalTextFile(await importOriginal());

  readTextFileFromDisk.holder.current = readFromDisk;

  return {
    readTextFile: vi.fn((filePath: string) => readTextFileFromDisk.holder.current?.(filePath)),
  };
});

vi.mock('./loadServerEntry.js', () => ({
  loadServerEntry: vi.fn(),
}));

const createPageRequest = (originalUrl: string) => {
  const request: Request = Object.create(null);

  request.originalUrl = originalUrl;

  return request;
};

const request = createPageRequest('/order?x=1');

const renderedPage = {
  html: '<p id="app">Home</p>',
  dehydratedQueryState: { queries: [{ state: { data: '</script>' } }] },
  zustandState: { cart: [] },
  routerHydrationState: { loaderData: { root: { user: '</ScRiPt>' } }, actionData: null, errors: null },
  statusCode: 200,
};

const render = vi.fn(async () => renderedPage);

const vite = {
  transformIndexHtml: vi.fn(async (_url: string, html: string) => html),
  ssrLoadModule: vi.fn(async (): Promise<Record<string, unknown>> => ({ renderSsrTemplate: render })),
};

describe('renderPage', () => {
  const nodeEnv = Config.nodeEnv;

  beforeEach(() => {
    vi.clearAllMocks();
    Config.nodeEnv = nodeEnv;
    vi.mocked(readTextFile).mockImplementation((filePath: string) => {
      if (!readTextFileFromDisk.holder.current) {
        throw new Error('The original readTextFile is not available');
      }

      return readTextFileFromDisk.holder.current(filePath);
    });
    vi.mocked(vite.transformIndexHtml).mockImplementation(async (_url, html) => html);
    vi.mocked(vite.ssrLoadModule).mockResolvedValue({ renderSsrTemplate: render });
    render.mockResolvedValue(renderedPage);
  });

  afterEach(() => {
    Config.nodeEnv = nodeEnv;
  });

  test('should refuse to use the production bundle when Vite is not running', async () => {
    await expect(renderPage(request, undefined)).rejects.toThrow(
      'Vite dev server is required to render a page outside production',
    );
    expect(readTextFile).not.toHaveBeenCalled();
  });

  test('should render the dev template and escape inline state', async () => {
    const page = await renderPage(request, vite);

    expect(vite.transformIndexHtml).toHaveBeenCalledWith('/order?x=1', expect.stringContaining('<!-- app html -->'));
    expect(vite.ssrLoadModule).toHaveBeenCalledWith(
      expect.stringContaining('src/client/app/entrypoint/entryServer.tsx'),
    );
    expect(render).toHaveBeenCalledWith(request, undefined);
    expect(page.statusCode).toBe(200);
    expect(page.html).toContain('<p id="app">Home</p>');
    expect(page.html).toContain('\\u003c/script\\u003e');
    expect(page.html).toContain('\\u003c/ScRiPt\\u003e');
    expect(page.html).not.toContain('<!-- app html -->');
    expect(page.html).not.toContain('<!-- app-initial-data -->');
  });

  test('should reject a template that lost its markers before rendering', async () => {
    vi.mocked(vite.transformIndexHtml).mockResolvedValue('<html></html>');

    await expect(renderPage(request, vite)).rejects.toThrow(
      'SSR template is missing <!-- app html -->, <!-- app-initial-data -->',
    );
    expect(render).not.toHaveBeenCalled();
  });

  test('should reject an SSR entry that does not export the render function', async () => {
    vi.mocked(vite.ssrLoadModule).mockResolvedValue({});

    await expect(renderPage(request, vite)).rejects.toThrow('SSR entry does not export renderSsrTemplate');
  });

  test('should cache the production template and retry a failed bundle load', async () => {
    Config.nodeEnv = 'production';
    vi.mocked(readTextFile).mockResolvedValue(
      '<html><head><!-- app-initial-data --></head><body><div id="root"><!-- app html --></div></body></html>',
    );
    vi.mocked(loadServerEntry).mockRejectedValueOnce(new Error('bundle missing'));

    await expect(renderPage(request, undefined)).rejects.toThrow('bundle missing');

    vi.mocked(loadServerEntry).mockResolvedValue({ renderSsrTemplate: render });

    const first = await renderPage(request, undefined);
    const second = await renderPage(request, undefined);

    expect(readTextFile).toHaveBeenCalledTimes(2);
    expect(readTextFile).toHaveBeenCalledWith(CLIENT_TEMPLATE_PATH);
    expect(loadServerEntry).toHaveBeenCalledTimes(2);
    expect(vite.ssrLoadModule).not.toHaveBeenCalled();
    expect(first.html).toContain('<p id="app">Home</p>');
    expect(first.html).toContain('\\u003c/script\\u003e');
    expect(second.html).toBe(first.html);
  });
});
