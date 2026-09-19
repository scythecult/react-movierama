import type { StatusCodes } from 'http-status-codes';
import type { ErrorCode } from '../constants/error';

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
