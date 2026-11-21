import type { Logger } from 'pino';
import { toError } from '../../helpers/error';
import { logger } from './logger';

// Pino 10 removed pino.final. fatal() flushSyncs the destination, so the line is not left in the async buffer.
const logFatalAndExit = (rootLogger: Logger, reason: unknown, message: string) => {
  rootLogger.child({ module: 'process' }).fatal({ err: toError(reason, message) }, message);
  process.exit(1);
};

export const installFatalHandlers = (rootLogger: Logger = logger) => {
  const onUncaughtException = (error: Error) => {
    logFatalAndExit(rootLogger, error, 'Uncaught exception');
  };

  const onUnhandledRejection = (reason: unknown) => {
    logFatalAndExit(rootLogger, reason, 'Unhandled rejection');
  };

  process.on('uncaughtException', onUncaughtException);
  process.on('unhandledRejection', onUnhandledRejection);

  return () => {
    process.off('uncaughtException', onUncaughtException);
    process.off('unhandledRejection', onUnhandledRejection);
  };
};
