import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import z, { ZodError } from 'zod';
import { ErrorCode } from '../../lib/errors/CustomError';
import { CustomError } from '../../lib/errors/CustomError';
import { getErrorMessage, toError } from '../../lib/helpers/error';
import { getModuleLogger, LogModule } from '../../lib/infra/logger';

/**
 * CustomError and ZodError contracts:
 *
 * - `message`: A human-readable error message.
 * - `errors`: A dictionary of field-specific errors, if applicable.
 * - `code`: A custom error code.
 *
 * Example:
 *  {email: ['Please enter a valid email address']}
 *
 *
 */

const toLoggedError = (error: unknown) => {
  // Zod issues can carry the submitted password. Log the type, not the input.
  if (error instanceof ZodError) {
    return new Error('Validation error');
  }

  return toError(error, getErrorMessage(error));
};

const logRequestError = (request: Request, error: unknown, message: string, level: 'error' | 'warn') => {
  const log = request.log ?? getModuleLogger(LogModule.api);

  log[level]({ err: toLoggedError(error) }, message);
};

export const errorMiddleware = (error: unknown, request: Request, response: Response, _next: NextFunction) => {
  // TODO Update
  // if (response.headersSent || config.debug) {
  //   next(error);

  //   return;
  // }

  // TODO Continue implement error handling for CustomError

  if (error instanceof CustomError) {
    const errors = { [error.cause ?? '']: error.message };

    logRequestError(
      request,
      error,
      error.message || 'Request failed',
      error.statusCode >= StatusCodes.INTERNAL_SERVER_ERROR ? 'error' : 'warn',
    );

    response.status(error.statusCode).json({ error: { message: error.message, errors, code: error.code } });

    return;
  }

  if (error instanceof ZodError) {
    const { fieldErrors } = z.flattenError(error);

    logRequestError(request, error, 'Validation error', 'warn');

    response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: { message: 'Validation error', errors: fieldErrors, code: ErrorCode.ERR_VALID } });

    return;
  }

  logRequestError(request, error, 'Unhandled error', 'error');

  response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: { message: getErrorMessage(error) || 'Internal server error. Please view logs for more details' } });
};
