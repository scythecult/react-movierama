import { authQueries } from '../../entities/auth/api';
import { locationsQueries } from '../../entities/locations/api';
import { ensureResolvedLocation } from '../../features/locations/model/locations.resolvers';
import { loadQuery } from '../../shared/api/load-query';
import { queryClient } from '../../shared/api/query-client';
import { rootLoader } from './root.loader';

vi.mock('../../shared/api/load-query', () => ({
  loadQuery: vi.fn(),
}));

vi.mock('../../features/locations/model/locations.resolvers', () => ({
  ensureResolvedLocation: vi.fn(),
}));

describe('rootLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should prefetch the header queries and return their data', async () => {
    vi.mocked(loadQuery).mockResolvedValueOnce({ id: '1' }).mockResolvedValueOnce([{ id: 23 }]);
    vi.mocked(ensureResolvedLocation).mockResolvedValue({ id: 23 });

    const result = await rootLoader();

    expect(loadQuery).toHaveBeenNthCalledWith(1, queryClient, authQueries.getOne());
    expect(loadQuery).toHaveBeenNthCalledWith(2, queryClient, locationsQueries.list());
    expect(ensureResolvedLocation).toHaveBeenCalledWith(queryClient);
    expect(result).toEqual({
      user: { id: '1' },
      locations: [{ id: 23 }],
      location: { id: 23 },
    });
  });

  test('should keep a failed header query as empty loader data', async () => {
    vi.mocked(loadQuery).mockResolvedValue(undefined);
    vi.mocked(ensureResolvedLocation).mockResolvedValue(null);

    await expect(rootLoader()).resolves.toEqual({
      user: null,
      locations: null,
      location: null,
    });
  });
});
