import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CookieName } from '../../../lib/constants/cookies';
import type { UserService } from '../../../services/user/UserService';

export class AuthController {
  #service;

  constructor(service: UserService) {
    this.#service = service;
  }

  get = async (request: Request, response: Response) => {
    const { cookies } = request;
    const sessionId = cookies[CookieName.AUTH_SESSION_ID];

    if (!sessionId) {
      return response.status(StatusCodes.OK).json({ data: {} });
    }

    const user = await this.#service.getOne(sessionId);

    return response.status(StatusCodes.OK).json({ data: { user } });
  };

  signUp = async (request: Request, response: Response) => {
    const { cookies, body } = request;
    const sessionId = cookies[CookieName.AUTH_SESSION_ID];

    if (!sessionId) {
      const user = await this.#service.create(body);

      response.cookie(CookieName.AUTH_SESSION_ID, user.id, { httpOnly: true, path: '/' });
      return response.status(StatusCodes.CREATED).json({ data: { user } });
    }

    const existingUser = await this.#service.getOne(sessionId);
    const statusCode = existingUser ? StatusCodes.BAD_REQUEST : StatusCodes.UNAUTHORIZED;

    return response.status(statusCode).json({ data: null });
  };

  signIn = async (request: Request, response: Response) => {
    const { cookies } = request;
    const sessionId = cookies[CookieName.AUTH_SESSION_ID];
    console.info({ sessionId });
    const user = await this.#service.getOne(sessionId);
    const responseData = { user: user ? { ...user } : null };

    return response.status(StatusCodes.OK).json({ data: responseData });
  };
}
