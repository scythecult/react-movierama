import type { StatusCodes } from 'http-status-codes';

export const ErrorCode = {
  ERR_NF: 'ERR_NF',
  ERR_VALID: 'ERR_VALID',
  ERR_DB: 'ERR_DB',
  ERR_AUTH: 'ERR_AUTH',
  ERR_EXISTS: 'ERR_EXISTS',
} as const;

type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

type CustomErrorType = {
  message: string;
  statusCode: StatusCodes;
  code?: ErrorCode;
  cause?: string;
};

export class CustomError extends Error {
  message: string;
  statusCode: StatusCodes;
  code?: ErrorCode;
  cause?: string;

  constructor(options: CustomErrorType) {
    super();
    this.message = options.message;
    this.statusCode = options.statusCode;
    this.code = options.code;
    this.cause = options.cause;
  }
}
