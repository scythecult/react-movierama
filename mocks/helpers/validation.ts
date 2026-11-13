import { StatusCodes } from 'http-status-codes';
import z, { type ZodType } from 'zod';
import { ErrorCode } from '../../src/server/lib/errors/CustomError';
import { jsonError } from './http';

export const validationError = (error: z.ZodError) => {
  const { fieldErrors } = z.flattenError(error);

  return jsonError(StatusCodes.UNPROCESSABLE_ENTITY, {
    message: 'Validation error',
    errors: fieldErrors,
    code: ErrorCode.ERR_VALID,
  });
};

export const parseWithSchema = <TSchema extends ZodType>(schema: TSchema, data: unknown) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    return validationError(result.error);
  }

  return result.data as z.output<TSchema>;
};
