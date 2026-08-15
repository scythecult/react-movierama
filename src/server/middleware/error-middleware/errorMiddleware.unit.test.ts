import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z, type ZodError } from 'zod';
import { ErrorCode } from '../../lib/constants/error';
import { CustomError } from '../../lib/errors/CustomError';
import * as errorHelpers from '../../lib/helpers/error';
import { errorMiddleware } from './errorMiddleware';

vi.mock('../../lib/helpers/error', () => ({
  getErrorMessage: vi.fn(),
}));

describe('errorMiddleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    mockNext = vi.fn();
    vi.clearAllMocks();
  });

  test('should handle CustomError and return the corresponding status and code', () => {
    const ERROR_MESSAGE = 'Ресурс не найден';

    const customError = new CustomError({
      message: ERROR_MESSAGE,
      statusCode: StatusCodes.NOT_FOUND,
      code: ErrorCode.ERR_NF,
    });

    errorMiddleware(customError, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: {
        message: ERROR_MESSAGE,
        code: ErrorCode.ERR_NF,
      },
    });
  });

  test('should handle ZodError and return 422 validation error with flat field list', () => {
    const schema = z.object({
      email: z.email(),
      password: z.string().min(6),
    });

    const result = schema.safeParse({ email: 'invalid-email', password: '123' });
    expect(result.success).toBe(false);

    const zodError = result.error as ZodError;

    errorMiddleware(zodError, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: {
        message: 'Validation error',
        code: ErrorCode.ERR_VALID,
        errors: {
          email: ['Invalid email address'],
          password: ['Too small: expected string to have >=6 characters'],
        },
      },
    });
  });

  test('should handle unknown error and return 500 message from getErrorMessage', () => {
    const ERROR_MESSAGE = 'Что-то пошло совсем не так';
    const unknownError = new Error(ERROR_MESSAGE);
    vi.mocked(errorHelpers.getErrorMessage).mockReturnValue(ERROR_MESSAGE);

    errorMiddleware(unknownError, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: {
        message: ERROR_MESSAGE,
      },
    });
  });

  test('should return default 500 message if getErrorMessage returns empty string', () => {
    const stringError = 'Странная ошибка-строка';
    vi.mocked(errorHelpers.getErrorMessage).mockReturnValue('');

    errorMiddleware(stringError, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: {
        message: 'Internal server error. Please view logs for more details',
      },
    });
  });
});
