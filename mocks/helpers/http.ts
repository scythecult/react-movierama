import { StatusCodes } from 'http-status-codes';
import { HttpResponse } from 'msw';
import { ApiVersion } from '../../src/common/constants/routes';
import { getErrorMessage } from '../../src/server/lib/helpers/error';

type ApiErrorBody = {
  message: string;
  errors?: Record<string, string | string[] | undefined>;
  code?: string;
};

// `*` matches the SSR origin and the API origin. Watch mode talks to the API
// directly and does not start these mocks.
export const apiUrl = (path: string) => `*${ApiVersion.V1}${path}`;

export const jsonData = <TData>(data: TData, status = StatusCodes.OK) => HttpResponse.json({ data }, { status });

export const jsonError = (status: number, error: ApiErrorBody) =>
  HttpResponse.json(
    {
      error: {
        message: error.message,
        ...(error.errors ? { errors: error.errors } : {}),
        ...(error.code ? { code: error.code } : {}),
      },
    },
    { status },
  );

// Same shape as errorMiddleware for CustomError: `errors[cause]` is the message string.
export const domainError = (status: number, message: string, code: string, cause: string) =>
  jsonError(status, {
    message,
    errors: { [cause]: message },
    code,
  });

export const internalError = (error: unknown) =>
  jsonError(StatusCodes.INTERNAL_SERVER_ERROR, {
    message: getErrorMessage(error) || 'Internal server error. Please view logs for more details',
  });

export const readJsonBody = async (request: Request) => {
  try {
    return await request.json();
  } catch (error) {
    return internalError(error);
  }
};
