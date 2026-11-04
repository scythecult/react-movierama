import { MOCK_NEWS } from '../../../../../mocks/data/news';
import type { NewsService } from '../../../services/news/NewsService';
import { ListNewsUseCase } from './ListNewsUseCase';

describe('ListNewsUseCase', () => {
  const getAll = vi.fn();
  const news = { getAll } as unknown as NewsService;
  const useCase = new ListNewsUseCase(news);

  beforeEach(() => {
    getAll.mockReset();
  });

  test('should return the news catalog', async () => {
    getAll.mockResolvedValue(MOCK_NEWS);

    await expect(useCase.execute()).resolves.toEqual(MOCK_NEWS);

    expect(getAll).toHaveBeenCalledWith();
  });
});
