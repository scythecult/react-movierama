import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ListNewsUseCase } from '../../../lib/use-cases/news/ListNewsUseCase';

type NewsUseCaseMap = {
  listNews: ListNewsUseCase;
};

export class NewsController {
  #useCaseMap;

  constructor(useCaseMap: NewsUseCaseMap) {
    this.#useCaseMap = useCaseMap;
  }

  list = async (_request: Request, response: Response) => {
    const news = await this.#useCaseMap.listNews.execute();

    return response.status(StatusCodes.OK).json({ data: { news } });
  };
}
