import { hallplanQueries } from '../../../entities/hallplan/api';
import { ensureResolvedLocation } from '../../../features/locations/model/locations.resolvers';
import { loadQuery } from '../../../shared/api/load-query';
import { queryClient } from '../../../shared/api/query-client';
import { orderLoader } from './order.loaders';

vi.mock('../../../shared/api/load-query', () => ({
  loadQuery: vi.fn(),
}));

vi.mock('../../../features/locations/model/locations.resolvers', () => ({
  ensureResolvedLocation: vi.fn(),
}));

describe('orderLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should load the hall plan for the resolved city', async () => {
    vi.mocked(ensureResolvedLocation).mockResolvedValue({ id: 23 });
    vi.mocked(loadQuery).mockResolvedValue({ seats: [] });

    const result = await orderLoader();

    expect(ensureResolvedLocation).toHaveBeenCalledWith(queryClient);
    expect(loadQuery).toHaveBeenCalledWith(
      queryClient,
      expect.objectContaining({ queryKey: hallplanQueries.getOne(23).queryKey }),
    );
    expect(result).toEqual({
      location: { id: 23 },
      hallplan: { seats: [] },
    });
  });

  test('should skip the hall plan when no city is selected', async () => {
    vi.mocked(ensureResolvedLocation).mockResolvedValue(null);

    await expect(orderLoader()).resolves.toEqual({ location: null, hallplan: null });
    expect(loadQuery).not.toHaveBeenCalled();
  });
});
