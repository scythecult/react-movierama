import type { NextFunction, Request, Response } from 'express';
import z, { ZodError } from 'zod';
import { validationMiddlewareBuilder } from './validationMiddlewareBuilder';

describe('validationMiddlewareBuilder', () => {
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockResponse = {};
    mockNext = vi.fn();
  });

  test('should successfully call next() if all data matches the schemas', async () => {
    // 1. Create schemas for different parts of the request
    const bodySchema = z.object({
      username: z.string(),
    });
    const querySchema = z.object({
      page: z.string().transform(Number),
    });

    // 2. Build the middleware
    const middleware = validationMiddlewareBuilder({
      body: bodySchema,
      query: querySchema,
    });

    // 3. Mock a valid Express request
    const mockRequest = {
      body: { username: 'john_doe' },
      query: { page: '1' },
    } as unknown as Request;

    // 4. Call the middleware
    await middleware(mockRequest, mockResponse as Response, mockNext);

    // 5. Verify that control is passed to the next middleware without errors
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith();
  });

  test('should throw ZodError and not call next() if data in body is invalid', async () => {
    const bodySchema = z.object({
      email: z.email(),
    });

    const middleware = validationMiddlewareBuilder({ body: bodySchema });

    // Invalid email
    const mockRequest = {
      body: { email: 'not-an-email' },
    } as unknown as Request;

    // Since parseAsync throws an error, the middleware will throw an error and not call next()
    await expect(middleware(mockRequest, mockResponse as Response, mockNext)).rejects.toThrow(ZodError);

    // Verify that next() was not called, as execution stopped due to the error
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('should ignore sections of the request for which schemas are not defined', async () => {
    const querySchema = z.object({
      search: z.string(),
    });

    // Pass only the query schema, so the body section should be ignored
    const middleware = validationMiddlewareBuilder({ query: querySchema });

    // The body section should be ignored, as no schema is provided for it
    const mockRequest = {
      query: { search: 'js' },
      body: { invalidField: 123 }, // No schema for body, so no error should be thrown
    } as unknown as Request;

    await middleware(mockRequest, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  test('should skip validation for sections where data is missing in request[key]', async () => {
    const bodySchema = z.object({
      id: z.number(),
    });

    const middleware = validationMiddlewareBuilder({ body: bodySchema });

    // No body field in the request (e.g., a GET request without a body)
    const mockRequest = {
      query: {},
    } as unknown as Request;

    await middleware(mockRequest, mockResponse as Response, mockNext);

    // Method should continue, as !requestData condition is met
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  test('should sequentially validate multiple sections and fail on the second if the first is valid', async () => {
    const paramsSchema = z.object({ id: z.string() });
    const querySchema = z.object({ token: z.string() });

    const middleware = validationMiddlewareBuilder({
      params: paramsSchema,
      query: querySchema,
    });

    const mockRequest = {
      params: { id: '123' }, // Valid params
      query: { token: undefined }, // Invalid query (token is required)
    } as unknown as Request;

    await expect(middleware(mockRequest, mockResponse as Response, mockNext)).rejects.toThrow(ZodError);

    expect(mockNext).not.toHaveBeenCalled();
  });
});
