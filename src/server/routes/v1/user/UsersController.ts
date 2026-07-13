import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { UserService } from '../../../services/user/UserService';

export class UsersController {
  #service;

  constructor(service: UserService) {
    this.#service = service;
  }

  getUser = async (request: Request, response: Response) => {
    // TODO Temporary
    // const { id } = request.body;
    const { cookies } = request;
    const user = await this.#service.getOne(cookies['movierama-check']);

    console.info({ user });
    return response.status(StatusCodes.OK).json({ data: { user } });
  };

  createUser = async (request: Request, response: Response) => {
    const { body } = request;

    console.info({ body });
    const user = await this.#service.create(body);

    return response.status(StatusCodes.CREATED).json({ data: { user } });
  };

  // TODO Remove
  signInUser = async (request: Request, response: Response) => {
    const { body } = request;
    const { email, password } = body;
    const user = await this.#service.getOne(email);
    const responseData = { user: user ? { ...user } : null };

    response.cookie('movierama-check', 'test@asd.asd', { httpOnly: true, path: '/' });
    return response.status(StatusCodes.OK).json({ data: responseData });
  };
}
