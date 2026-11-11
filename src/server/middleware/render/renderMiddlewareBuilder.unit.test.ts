import express from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Server } from 'node:http';
import { request as httpRequest } from 'node:http';
import type { AddressInfo } from 'node:net';
import { renderMiddlewareBuilder } from './renderMiddlewareBuilder';
import { renderPage } from './renderPage';

vi.mock('./renderPage', () => ({
  renderPage: vi.fn(),
}));

const requestPath = (port: number, path: string) =>
  new Promise<{
    status: number;
    cacheControl: string | undefined;
    contentType: string | undefined;
    location: string | string[] | undefined;
    body: string;
  }>((resolve, reject) => {
      const request = httpRequest({ port, path }, (response) => {
        const chunks: Buffer[] = [];

        response.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });
        response.on('end', () => {
          resolve({
            status: response.statusCode ?? 0,
            cacheControl: response.headers['cache-control'],
            contentType: response.headers['content-type'],
            location: response.headers.location,
            body: Buffer.concat(chunks).toString(),
          });
        });
      });

      request.on('error', reject);
      request.end();
    },
  );

describe('renderMiddlewareBuilder', () => {
  let server: Server;
  let port: number;

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(renderPage).mockReset();
    vi.mocked(renderPage).mockResolvedValue({ html: '<!doctype html><html></html>', statusCode: StatusCodes.OK });

    const app = express();
    app.use(renderMiddlewareBuilder(undefined));
    server = app.listen(0);
    port = (server.address() as AddressInfo).port;
  });

  afterEach(async () => {
    vi.restoreAllMocks();

    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  });

  test('should mark personalized HTML as private and uncacheable', async () => {
    const response = await requestPath(port, '/order');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.cacheControl).toBe('private, no-store');
    expect(response.contentType).toBe('text/html; charset=utf-8');
    expect(renderPage).toHaveBeenCalledOnce();
  });

  test('should keep the status chosen by the renderer', async () => {
    vi.mocked(renderPage).mockResolvedValue({ html: '<p>Missing page</p>', statusCode: StatusCodes.NOT_FOUND });

    const response = await requestPath(port, '/missing');

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toContain('Missing page');
    expect(response.cacheControl).toBe('private, no-store');
  });

  test('should redirect when the renderer returns a location', async () => {
    vi.mocked(renderPage).mockResolvedValue({
      html: '',
      statusCode: StatusCodes.MOVED_TEMPORARILY,
      location: '/order',
    });

    const response = await requestPath(port, '/films/1');

    expect(response.status).toBe(StatusCodes.MOVED_TEMPORARILY);
    expect(response.location).toBe('/order');
    expect(response.cacheControl).toBe('private, no-store');
    expect(response.body).toBe('');
  });

  test('should finish a render failure with an HTML document', async () => {
    vi.mocked(renderPage).mockRejectedValue(new Error('render failed'));

    const response = await requestPath(port, '/order');

    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.contentType).toBe('text/html; charset=utf-8');
    expect(response.cacheControl).toBe('private, no-store');
    expect(response.body).toContain('The page could not be rendered.');
  });

  test('should answer 504 when rendering exceeds the deadline', async () => {
    const app = express();

    app.use(renderMiddlewareBuilder(undefined, { timeoutMs: 20 }));
    vi.mocked(renderPage).mockImplementation(
      (_request, _vite, signal) =>
        new Promise((_resolve, reject) => {
          signal?.addEventListener('abort', () => {
            reject(signal.reason);
          });
        }),
    );

    const timeoutServer = app.listen(0);
    const timeoutPort = (timeoutServer.address() as AddressInfo).port;

    try {
      const response = await requestPath(timeoutPort, '/order');

      expect(response.status).toBe(StatusCodes.GATEWAY_TIMEOUT);
      expect(response.contentType).toBe('text/html; charset=utf-8');
      expect(response.body).toContain('The page took too long to render.');
    } finally {
      await new Promise<void>((resolve, reject) => {
        timeoutServer.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      });
    }
  });

  test('should leave asset requests for the next handler', async () => {
    const response = await requestPath(port, '/src/client/app/entrypoint/entryClient.tsx');

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(renderPage).not.toHaveBeenCalled();
  });
});
