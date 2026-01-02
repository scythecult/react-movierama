import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { NewsService } from '../../../services/news/NewsService';

export class NewsController {
  #service;

  constructor(service: NewsService) {
    this.#service = service;
  }

  listNews = async (_: Request, response: Response) => {
    const news = await this.#service.getAll();

    return response.status(StatusCodes.OK).json({ data: { news } });
  };
}
