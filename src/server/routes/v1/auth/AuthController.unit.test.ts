import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { captureError, createMockResponse } from '../../../../tests/unit/helpers';
import {
  AlreadyAuthenticatedError,
  AlreadyExistsError,
  AuthenticationError,
  InvalidCredentialsError,
} from '../../../lib/errors/auth/AuthError';
import { ErrorCode } from '../../../lib/errors/CustomError';
import { ExpressSessionStore } from '../../../lib/helpers/session';
import type { GetCurrentUserUseCase } from '../../../lib/use-cases/auth/GetCurrentUserUseCase';
import type { SignInUseCase } from '../../../lib/use-cases/auth/SignInUseCase';
import type { SignUpUseCase } from '../../../lib/use-cases/auth/SignUpUseCase';
import { AuthController } from './AuthController';

const { sessionStore } = vi.hoisted(() => {
  const sessionStore = {
    regenerate: vi.fn(),
    setUser: vi.fn(),
    destroy: vi.fn(),
  };

  return { sessionStore };
});

vi.mock('../../../lib/helpers/session', () => ({
  ExpressSessionStore: vi.fn(function ExpressSessionStoreMock() {
    return sessionStore;
  }),
}));

describe('AuthController', () => {
  const getCurrentUser = { execute: vi.fn() };
  const signIn = { execute: vi.fn() };
  const signUp = { execute: vi.fn() };
  let controller: AuthController;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    getCurrentUser.execute.mockReset();
    signIn.execute.mockReset();
    signUp.execute.mockReset();
    sessionStore.regenerate.mockReset();
    sessionStore.setUser.mockReset();
    sessionStore.destroy.mockReset();
    sessionStore.destroy.mockResolvedValue(undefined);
    vi.mocked(ExpressSessionStore).mockClear();

    controller = new AuthController({
      getCurrentUser: getCurrentUser as unknown as GetCurrentUserUseCase,
      signIn: signIn as unknown as SignInUseCase,
      signUp: signUp as unknown as SignUpUseCase,
    });

    mockResponse = createMockResponse();
  });

  test('should return the current user', async () => {
    const user = { id: 'user-1', email: 'test@asd.asd' };
    const request = { session: { userId: 'user-1' } } as unknown as Request;
    getCurrentUser.execute.mockResolvedValue(user);

    await controller.get(request, mockResponse as Response);

    expect(getCurrentUser.execute).toHaveBeenCalledWith('user-1');
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { user } });
  });

  test('should return a null user when nobody is signed in', async () => {
    const request = { session: {} } as unknown as Request;
    getCurrentUser.execute.mockResolvedValue(null);

    await controller.get(request, mockResponse as Response);

    expect(getCurrentUser.execute).toHaveBeenCalledWith(undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { user: null } });
  });

  test('should sign in and return the user', async () => {
    const user = { id: 'user-1', email: 'test@asd.asd' };
    const request = {
      session: { userId: undefined },
      body: {
        email: 'test@asd.asd',
        phone: undefined,
        password: 'Asd12345',
        isPersistent: true,
      },
    } as unknown as Request;
    signIn.execute.mockResolvedValue(user);

    await controller.signIn(request, mockResponse as Response);

    expect(ExpressSessionStore).toHaveBeenCalledWith(request, mockResponse);
    expect(signIn.execute).toHaveBeenCalledWith(
      {
        email: 'test@asd.asd',
        phone: undefined,
        password: 'Asd12345',
        isPersistent: true,
        currentUserId: undefined,
      },
      sessionStore,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { user } });
  });

  test('should default isPersistent to false', async () => {
    const request = {
      session: { userId: 'user-1' },
      body: {
        email: 'test@asd.asd',
        password: 'Asd12345',
      },
    } as unknown as Request;
    signIn.execute.mockResolvedValue({ id: 'user-1' });

    await controller.signIn(request, mockResponse as Response);

    expect(signIn.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        isPersistent: false,
        currentUserId: 'user-1',
      }),
      sessionStore,
    );
  });

  test('should map invalid credentials to 401', async () => {
    const domainError = new InvalidCredentialsError();
    const request = {
      session: {},
      body: { email: 'test@asd.asd', password: 'Wrong123' },
    } as unknown as Request;
    signIn.execute.mockRejectedValue(domainError);

    const error = await captureError(() => controller.signIn(request, mockResponse as Response));

    expect(error).toBeInstanceOf(AuthenticationError);
    expect(error).toMatchObject({
      statusCode: StatusCodes.UNAUTHORIZED,
      message: domainError.message,
      code: ErrorCode.ERR_AUTH,
      cause: 'root.serverError',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  test('should map an already authenticated sign in to 409', async () => {
    const domainError = new AlreadyAuthenticatedError();
    const request = {
      session: { userId: 'user-1' },
      body: { email: 'test@asd.asd', password: 'Asd12345' },
    } as unknown as Request;
    signIn.execute.mockRejectedValue(domainError);

    const error = await captureError(() => controller.signIn(request, mockResponse as Response));

    expect(error).toBeInstanceOf(AuthenticationError);
    expect(error).toMatchObject({
      statusCode: StatusCodes.CONFLICT,
      message: domainError.message,
      code: ErrorCode.ERR_AUTH,
      cause: 'root.serverError',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  test('should rethrow an unknown sign in error', async () => {
    const domainError = new Error('database down');
    const request = {
      session: {},
      body: { email: 'test@asd.asd', password: 'Asd12345' },
    } as unknown as Request;
    signIn.execute.mockRejectedValue(domainError);

    const error = await captureError(() => controller.signIn(request, mockResponse as Response));

    expect(error).toBe(domainError);
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  test('should sign up and return the created user', async () => {
    const user = { id: 'user-1', email: 'new@asd.asd' };
    const requestBody = {
      email: 'new@asd.asd',
      password: 'Asd12345',
      confirmPassword: 'Asd12345',
    };
    const request = {
      session: { userId: undefined },
      body: requestBody,
    } as unknown as Request;
    signUp.execute.mockResolvedValue(user);

    await controller.signUp(request, mockResponse as Response);

    expect(ExpressSessionStore).toHaveBeenCalledWith(request, mockResponse);
    expect(signUp.execute).toHaveBeenCalledWith(
      {
        user: requestBody,
        currentUserId: undefined,
      },
      sessionStore,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { user } });
  });

  test('should map an existing user to 409', async () => {
    const domainError = new AlreadyExistsError();
    const request = {
      session: {},
      body: { email: 'new@asd.asd' },
    } as unknown as Request;
    signUp.execute.mockRejectedValue(domainError);

    const error = await captureError(() => controller.signUp(request, mockResponse as Response));

    expect(error).toBeInstanceOf(AuthenticationError);
    expect(error).toMatchObject({
      statusCode: StatusCodes.CONFLICT,
      message: domainError.message,
      code: ErrorCode.ERR_EXISTS,
      cause: 'email',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  test('should destroy the session and return a null user', async () => {
    const request = { session: { userId: 'user-1' } } as unknown as Request;

    await controller.signOut(request, mockResponse as Response);

    expect(ExpressSessionStore).toHaveBeenCalledWith(request, mockResponse);
    expect(sessionStore.destroy).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { user: null } });
  });
});
