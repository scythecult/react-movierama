import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ListFilmsUseCase } from '../../../lib/use-cases/films/ListFilmsUseCase';

type FilmsUseCaseMap = {
  listFilms: ListFilmsUseCase;
};

export class FilmsController {
  #useCaseMap;

  constructor(useCaseMap: FilmsUseCaseMap) {
    this.#useCaseMap = useCaseMap;
  }

  list = async (_request: Request, response: Response) => {
    const films = await this.#useCaseMap.listFilms.execute();

    return response.status(StatusCodes.OK).json({ data: { films } });
  };
}
