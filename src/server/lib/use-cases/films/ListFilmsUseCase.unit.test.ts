import { MOCK_FILMS } from '../../../../../mocks/data/films';
import type { FilmService } from '../../../services/film/FilmService';
import { ListFilmsUseCase } from './ListFilmsUseCase';

describe('ListFilmsUseCase', () => {
  const getAll = vi.fn();
  const films = { getAll } as unknown as FilmService;
  const useCase = new ListFilmsUseCase(films);

  beforeEach(() => {
    getAll.mockReset();
  });

  test('should return the film catalog', async () => {
    getAll.mockResolvedValue(MOCK_FILMS);

    await expect(useCase.execute()).resolves.toEqual(MOCK_FILMS);

    expect(getAll).toHaveBeenCalledWith();
  });
});
