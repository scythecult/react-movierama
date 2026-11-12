import type { QueryClient } from '@tanstack/react-query';
import { createTestQueryClient,TEST_EMPTY_LOCATION, TEST_MOSCOW_LOCATION } from '../../../../tests/unit/helpers';
import { ensureResolvedLocation } from './locations.resolvers';

const getCurrent = vi.fn();
const detectCurrent = vi.fn();

vi.mock('../../../entities/locations/api', () => ({
  locationsQueries: {
    getCurrent: () => ({
      queryKey: ['location', 'current'],
      queryFn: () => getCurrent(),
    }),
    detectCurrent: () => ({
      queryKey: ['location', 'detect'],
      queryFn: () => detectCurrent(),
    }),
  },
}));

describe('ensureResolvedLocation', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    getCurrent.mockReset();
    detectCurrent.mockReset();
  });

  test('should return the current location when it is selected', async () => {
    getCurrent.mockResolvedValue(TEST_MOSCOW_LOCATION);

    await expect(ensureResolvedLocation(queryClient)).resolves.toEqual(TEST_MOSCOW_LOCATION);
    expect(detectCurrent).not.toHaveBeenCalled();
  });

  test('should detect a location when the current one is missing', async () => {
    getCurrent.mockResolvedValue(null);
    detectCurrent.mockResolvedValue(TEST_MOSCOW_LOCATION);

    await expect(ensureResolvedLocation(queryClient)).resolves.toEqual(TEST_MOSCOW_LOCATION);
    expect(detectCurrent).toHaveBeenCalledTimes(1);
  });

  test('should detect a location when the current request fails', async () => {
    getCurrent.mockRejectedValue(new Error('location unavailable'));
    detectCurrent.mockResolvedValue(TEST_MOSCOW_LOCATION);

    await expect(ensureResolvedLocation(queryClient)).resolves.toEqual(TEST_MOSCOW_LOCATION);
  });

  test('should stop when the request is aborted', async () => {
    const abort = new DOMException('The SSR render timed out', 'TimeoutError');
    getCurrent.mockRejectedValue(abort);

    await expect(ensureResolvedLocation(queryClient)).rejects.toBe(abort);
    expect(detectCurrent).not.toHaveBeenCalled();
  });

  test('should return null when no location can be resolved', async () => {
    getCurrent.mockResolvedValue(TEST_EMPTY_LOCATION);
    detectCurrent.mockResolvedValue(null);

    await expect(ensureResolvedLocation(queryClient)).resolves.toBeNull();
  });

  test('should reuse the cached resolution', async () => {
    getCurrent.mockResolvedValue(null);
    detectCurrent.mockResolvedValue(TEST_MOSCOW_LOCATION);

    await ensureResolvedLocation(queryClient);
    await ensureResolvedLocation(queryClient);

    expect(getCurrent).toHaveBeenCalledTimes(1);
    expect(detectCurrent).toHaveBeenCalledTimes(2);
  });
});
