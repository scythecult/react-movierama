import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import z, { ZodError } from 'zod';
import { ErrorCode } from '../../lib/constants/error';
import { CustomError } from '../../lib/errors/CustomError';
import { getErrorMessage } from '../../lib/helpers/error';

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
export const errorMiddleware = (error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  // TODO Update
  // if (response.headersSent || config.debug) {
  //   next(error);

  //   return;
  // }

  // TODO Continue implement error handling for CustomError

  if (error instanceof CustomError) {
    const errors = { [error.cause ?? '']: error.message };

    response.status(error.statusCode).json({ error: { message: error.message, errors, code: error.code } });

    return;
  }

  if (error instanceof ZodError) {
    const { fieldErrors } = z.flattenError(error);

    response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: { message: 'Validation error', errors: fieldErrors, code: ErrorCode.ERR_VALID } });

    return;
  }

  response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: { message: getErrorMessage(error) || 'Internal server error. Please view logs for more details' } });
};
