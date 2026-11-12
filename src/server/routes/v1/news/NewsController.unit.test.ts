import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createMockResponse } from '../../../../tests/unit/helpers';
import type { ListNewsUseCase } from '../../../lib/use-cases/news/ListNewsUseCase';
import { NewsController } from './NewsController';

describe('NewsController', () => {
  const listNews = { execute: vi.fn() };
  let controller: NewsController;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    listNews.execute.mockReset();

    controller = new NewsController({
      listNews: listNews as unknown as ListNewsUseCase,
    });

    mockResponse = createMockResponse();
  });

  test('should return the news catalog', async () => {
    const news = [{ id: 1, headline: 'Следите за анонсами' }];
    listNews.execute.mockResolvedValue(news);

    await controller.list({} as Request, mockResponse as Response);

    expect(listNews.execute).toHaveBeenCalledWith();
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { news } });
  });
});
