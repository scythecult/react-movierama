import type { NextFunction, Request, Response } from 'express';
import type { ZodDiscriminatedUnion, ZodIntersection, ZodObject, ZodOptional } from 'zod';

type ZodSchema = ZodIntersection | ZodDiscriminatedUnion | ZodObject | ZodOptional<ZodObject>;

type ParseWithSchemaOptions = {
  requestData: unknown;
  schema: ZodSchema;
};

type ValidationRequestParts = 'body' | 'query' | 'params' | 'headers';

type ValidationMiddlewareBuilderSchemaMap = Partial<Record<ValidationRequestParts, ZodSchema>>;

const parseWithSchema = async (options: ParseWithSchemaOptions) => {
  const { schema, requestData } = options;

  await schema.parseAsync(requestData);
};

export const validationMiddlewareBuilder =
  (schemaMap: ValidationMiddlewareBuilderSchemaMap) => async (request: Request, _: Response, next: NextFunction) => {
    const schemaKeys = Object.keys(schemaMap) as ValidationRequestParts[];

    for (const schemaKey of schemaKeys) {
      const schema = schemaMap[schemaKey];
      const requestData = request[schemaKey];

      if (!schema || !requestData) {
        continue;
      }

      await parseWithSchema({
        schema,
        requestData,
      });
    }

    next();
  };
