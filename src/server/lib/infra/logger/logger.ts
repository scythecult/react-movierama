import { AsyncLocalStorage } from 'node:async_hooks';
import type { Logger } from 'pino';
import pino from 'pino';
import { Config } from '../../../../common/env';
import { buildLoggerOptions } from './loggerOptions';

export const LogModule = {
  api: 'api',
  ssr: 'ssr',
  db: 'db',
} as const;

export type LogModuleName = (typeof LogModule)[keyof typeof LogModule];

// stdout only. Docker, PM2, or Kubernetes collects the stream.
// Unit tests force a silent logger so importing this module does not print or start pino-pretty.
const nodeEnv = process.env.VITEST ? 'test' : Config.nodeEnv;
const logLevel = process.env.VITEST ? 'silent' : Config.logLevel;

export const logger = pino(buildLoggerOptions(nodeEnv, logLevel));

const requestLoggerStorage = new AsyncLocalStorage<Logger>();

export const bindRequestLogger = <T>(requestLogger: Logger, run: () => T) => requestLoggerStorage.run(requestLogger, run);

export const getModuleLogger = (module: LogModuleName) => {
  const requestLogger = requestLoggerStorage.getStore();

  return (requestLogger ?? logger).child({ module });
};

export const getRequestLogger = (request: { log?: Logger }, module: LogModuleName) =>
  request.log?.child({ module }) ?? getModuleLogger(module);
