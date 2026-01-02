import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { FilmService } from '../../../services/film/FilmService';

export class FilmsController {
  #service;

  constructor(service: FilmService) {
    this.#service = service;
  }

  listFilms = async (_: Request, response: Response) => {
    const films = await this.#service.getAll();

    return response.status(StatusCodes.OK).json({ data: { films } });
  };
}
