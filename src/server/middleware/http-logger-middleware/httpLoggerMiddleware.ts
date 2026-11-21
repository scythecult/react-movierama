import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { randomUUID } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Logger } from 'pino';
import pinoHttp from 'pino-http';
import { REQUEST_ID_HEADER } from '../../../common/constants/http';
import { readRequestId } from '../../../common/helpers/logger';
import { isStaticRequest } from '../../lib/helpers/isStaticRequest';
import { bindRequestLogger, logger, type LogModuleName } from '../../lib/infra/logger';

const resolveRequestLogLevel = (_request: IncomingMessage, response: ServerResponse, error?: Error) => {
  if (error || response.statusCode >= StatusCodes.INTERNAL_SERVER_ERROR) {
    return 'error';
  }

  if (response.statusCode >= StatusCodes.BAD_REQUEST) {
    return 'warn';
  }

  return 'info';
};

export const httpLoggerMiddleware = (module: LogModuleName, rootLogger: Logger = logger): RequestHandler => {
  const httpLogger = pinoHttp({
    logger: rootLogger.child({ module }),
    // Reuse a safe incoming id so SSR and API logs share one chain. Otherwise mint a new one.
    genReqId: (request, response) => {
      const requestId = readRequestId(request.headers[REQUEST_ID_HEADER]) ?? randomUUID();

      response.setHeader(REQUEST_ID_HEADER, requestId);

      return requestId;
    },
    autoLogging: {
      ignore: (request) => isStaticRequest(request.url),
    },
    customLogLevel: resolveRequestLogLevel,
    // Access logs keep the request. req.log used by handlers carries only reqId.
    quietReqLogger: true,
  });

  return (request, response, next) => {
    httpLogger(request, response, () => {
      bindRequestLogger(request.log, () => {
        next();
      });
    });
  };
};
