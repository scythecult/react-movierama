import express from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Server } from 'node:http';
import { request as httpRequest } from 'node:http';
import type { AddressInfo } from 'node:net';
import pino from 'pino';
import { REQUEST_ID_HEADER } from '../../../common/constants/http';
import { captureLogs } from '../../../tests/unit/captureLogs';
import { getModuleLogger, LogModule } from '../../lib/infra/logger';
import { buildLoggerOptions, REDACT_CENSOR } from '../../lib/infra/logger/loggerOptions';
import { httpLoggerMiddleware } from './httpLoggerMiddleware';

const logs = captureLogs();

const sendRequest = (
  port: number,
  path: string,
  options: { method?: string; headers?: Record<string, string>; body?: string } = {},
) =>
  new Promise<{ status: number; requestId: string | undefined }>((resolve, reject) => {
    const request = httpRequest(
      {
        port,
        path,
        method: options.method ?? 'GET',
        headers: options.headers,
      },
      (response) => {
        response.resume();
        response.on('end', () => {
          const header = response.headers[REQUEST_ID_HEADER];

          resolve({
            status: response.statusCode ?? 0,
            requestId: Array.isArray(header) ? header[0] : header,
          });
        });
      },
    );

    request.on('error', reject);

    if (options.body) {
      request.write(options.body);
    }

    request.end();
  });

describe('httpLoggerMiddleware', () => {
  let server: Server;
  let port: number;

  beforeAll(() => {
    const log = pino(buildLoggerOptions('production', 'debug'), logs.stream);
    const app = express();

    app.use(httpLoggerMiddleware(LogModule.api, log));
    app.get('/health', (_request, response) => {
      response.status(StatusCodes.OK).json({ ok: true });
    });
    app.get('/assets/app.js', (_request, response) => {
      response.type('js').send('console.log(1)');
    });
    app.get('/order', (_request, response) => {
      getModuleLogger(LogModule.db).debug({ entity: 'film' }, 'Database operation completed');
      response.status(StatusCodes.OK).type('html').send('<p>ok</p>');
    });
    app.post('/v1/auth/signin', (_request, response) => {
      response.status(StatusCodes.OK).json({ ok: true });
    });
    app.get('/missing', (_request, response) => {
      response.status(StatusCodes.NOT_FOUND).json({ message: 'missing' });
    });

    server = app.listen(0);
    port = (server.address() as AddressInfo).port;
  });

  afterAll(async () => {
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

  beforeEach(() => {
    logs.clear();
  });

  test('should assign a request id and log the document', async () => {
    const response = await sendRequest(port, '/health');
    const [line] = logs.read();

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.requestId).toEqual(expect.any(String));
    expect(line).toMatchObject({
      module: 'api',
      reqId: response.requestId,
      msg: 'request completed',
    });
  });

  test('should reuse a safe incoming request id', async () => {
    const response = await sendRequest(port, '/health', {
      headers: { [REQUEST_ID_HEADER]: 'ssr-req-1' },
    });

    expect(response.requestId).toBe('ssr-req-1');
    expect(logs.read()[0]).toMatchObject({ reqId: 'ssr-req-1' });
  });

  test('should replace a request id that would break the log line', async () => {
    const response = await sendRequest(port, '/health', {
      headers: { [REQUEST_ID_HEADER]: 'bad id' },
    });

    expect(response.requestId).not.toBe('bad id');
    expect(response.requestId).toEqual(expect.any(String));
  });

  test('should skip static assets', async () => {
    const response = await sendRequest(port, '/assets/app.js');

    expect(response.status).toBe(StatusCodes.OK);
    expect(logs.read()).toEqual([]);
  });

  test('should hide cookies and tokens and keep the same id on the db log', async () => {
    const response = await sendRequest(port, '/order', {
      headers: {
        cookie: 'connect.sid=super-secret',
        authorization: 'Bearer super-token',
      },
    });
    const lines = logs.read();
    const serialized = JSON.stringify(lines);

    expect(serialized).not.toContain('super-secret');
    expect(serialized).not.toContain('super-token');
    expect(serialized).toContain(REDACT_CENSOR);
    expect(lines).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ module: 'db', reqId: response.requestId, entity: 'film' }),
        expect.objectContaining({ module: 'api', reqId: response.requestId, msg: 'request completed' }),
      ]),
    );
  });

  test('should not write a request body password into the access log', async () => {
    await sendRequest(port, '/v1/auth/signin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password: 'SuperSecret123' }),
    });

    expect(JSON.stringify(logs.read())).not.toContain('SuperSecret123');
  });

  test('should log client errors at warn', async () => {
    await sendRequest(port, '/missing');

    expect(logs.read()[0]).toMatchObject({ level: 40, msg: 'request completed' });
  });
});
