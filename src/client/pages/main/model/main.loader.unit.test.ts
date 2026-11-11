import { filmsQueries } from '../../../entities/films/api';
import { newsQueries } from '../../../entities/news/api';
import { loadQuery } from '../../../shared/api/load-query';
import { queryClient } from '../../../shared/api/query-client';
import { mainLoader } from './main.loader';

vi.mock('../../../shared/api/load-query', () => ({
  loadQuery: vi.fn(),
}));

describe('mainLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should prefetch films and news', async () => {
    vi.mocked(loadQuery).mockResolvedValueOnce([{ id: 8 }]).mockResolvedValueOnce([{ id: 3 }]);

    const result = await mainLoader();

    expect(loadQuery).toHaveBeenNthCalledWith(1, queryClient, filmsQueries.list());
    expect(loadQuery).toHaveBeenNthCalledWith(2, queryClient, newsQueries.list());
    expect(result).toEqual({ films: [{ id: 8 }], news: [{ id: 3 }] });
  });
});
