import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { UserSignInRequest, UserSignUpRequest } from '../../../../common/entities/auth';
import {
  AlreadyAuthenticatedError,
  AlreadyExistsError,
  AuthenticationError,
  InvalidCredentialsError,
} from '../../../lib/errors/auth/AuthError';
import { ErrorCode } from '../../../lib/errors/CustomError';
import { ExpressSessionStore } from '../../../lib/helpers/session';
import type { TypedRequest } from '../../../lib/types/request';
import type { GetCurrentUserUseCase } from '../../../lib/use-cases/auth/GetCurrentUserUseCase';
import type { SignInUseCase } from '../../../lib/use-cases/auth/SignInUseCase';
import type { SignUpUseCase } from '../../../lib/use-cases/auth/SignUpUseCase';

type AuthUseCaseMap = {
  getCurrentUser: GetCurrentUserUseCase;
  signIn: SignInUseCase;
  signUp: SignUpUseCase;
};

export class AuthController {
  #useCaseMap;

  constructor(useCaseMap: AuthUseCaseMap) {
    this.#useCaseMap = useCaseMap;
  }

  private toAuthHttpError(error: unknown) {
    if (error instanceof InvalidCredentialsError) {
      return new AuthenticationError({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: error.message,
        code: ErrorCode.ERR_AUTH,
        cause: 'root.serverError',
      });
    }

    if (error instanceof AlreadyAuthenticatedError) {
      return new AuthenticationError({
        statusCode: StatusCodes.CONFLICT,
        message: error.message,
        code: ErrorCode.ERR_AUTH,
        cause: 'root.serverError',
      });
    }

    if (error instanceof AlreadyExistsError) {
      return new AuthenticationError({
        statusCode: StatusCodes.CONFLICT,
        message: error.message,
        code: ErrorCode.ERR_EXISTS,
        cause: 'email',
      });
    }

    return error;
  }

  get = async (request: Request, response: Response) => {
    const user = await this.#useCaseMap.getCurrentUser.execute(request.session.userId);

    return response.status(StatusCodes.OK).json({ data: { user } });
  };

  signUp = async (request: TypedRequest<UserSignUpRequest>, response: Response) => {
    try {
      const session = new ExpressSessionStore(request, response);
      const user = await this.#useCaseMap.signUp.execute(
        {
          user: request.body,
          currentUserId: request.session.userId,
        },
        session,
      );

      return response.status(StatusCodes.CREATED).json({ data: { user } });
    } catch (error) {
      throw this.toAuthHttpError(error);
    }
  };

  signIn = async (request: TypedRequest<UserSignInRequest>, response: Response) => {
    try {
      const session = new ExpressSessionStore(request, response);
      const user = await this.#useCaseMap.signIn.execute(
        {
          email: request.body.email,
          phone: request.body.phone,
          password: request.body.password,
          isPersistent: request.body.isPersistent ?? false,
          currentUserId: request.session.userId,
        },
        session,
      );

      return response.status(StatusCodes.OK).json({ data: { user } });
    } catch (error) {
      throw this.toAuthHttpError(error);
    }
  };

  signOut = async (request: Request, response: Response) => {
    const session = new ExpressSessionStore(request, response);

    await session.destroy();

    return response.status(StatusCodes.OK).json({ data: { user: null } });
  };
}
