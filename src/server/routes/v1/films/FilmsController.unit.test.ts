import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ListFilmsUseCase } from '../../../lib/use-cases/films/ListFilmsUseCase';
import { FilmsController } from './FilmsController';

describe('FilmsController', () => {
  const listFilms = { execute: vi.fn() };
  let controller: FilmsController;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    listFilms.execute.mockReset();

    controller = new FilmsController({
      listFilms: listFilms as unknown as ListFilmsUseCase,
    });

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

  test('should return the film catalog', async () => {
    const films = [{ id: 1, name: 'Горыныч' }];
    listFilms.execute.mockResolvedValue(films);

    await controller.list({} as Request, mockResponse as Response);

    expect(listFilms.execute).toHaveBeenCalledWith();
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { films } });
  });
});
