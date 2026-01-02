import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { UserService } from '../../../services/user/UserService';

export class UsersController {
  #service;

  constructor(service: UserService) {
    this.#service = service;
  }

  getUser = async (_: Request, response: Response) => {
    // TODO Temporary
    // const { id } = request.body;
    const user = await this.#service.getOne(1);

    return response.status(StatusCodes.OK).json({ data: { user } });
  };
}
