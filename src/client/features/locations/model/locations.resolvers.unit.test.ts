import { QueryClient } from '@tanstack/react-query';
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

const moscow = { id: 1, name: 'Москва и МО' };

describe('ensureResolvedLocation', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    getCurrent.mockReset();
    detectCurrent.mockReset();
  });

  test('should return the current location when it is selected', async () => {
    getCurrent.mockResolvedValue(moscow);

    await expect(ensureResolvedLocation(queryClient)).resolves.toEqual(moscow);
    expect(detectCurrent).not.toHaveBeenCalled();
  });

  test('should detect a location when the current one is missing', async () => {
    getCurrent.mockResolvedValue(null);
    detectCurrent.mockResolvedValue(moscow);

    await expect(ensureResolvedLocation(queryClient)).resolves.toEqual(moscow);
    expect(detectCurrent).toHaveBeenCalledTimes(1);
  });

  test('should detect a location when the current request fails', async () => {
    getCurrent.mockRejectedValue(new Error('location unavailable'));
    detectCurrent.mockResolvedValue(moscow);

    await expect(ensureResolvedLocation(queryClient)).resolves.toEqual(moscow);
  });

  test('should stop when the request is aborted', async () => {
    const abort = new DOMException('The SSR render timed out', 'TimeoutError');
    getCurrent.mockRejectedValue(abort);

    await expect(ensureResolvedLocation(queryClient)).rejects.toBe(abort);
    expect(detectCurrent).not.toHaveBeenCalled();
  });

  test('should return null when no location can be resolved', async () => {
    getCurrent.mockResolvedValue({ id: 0, name: '' });
    detectCurrent.mockResolvedValue(null);

    await expect(ensureResolvedLocation(queryClient)).resolves.toBeNull();
  });

  test('should reuse the cached resolution', async () => {
    getCurrent.mockResolvedValue(null);
    detectCurrent.mockResolvedValue(moscow);

    await ensureResolvedLocation(queryClient);
    await ensureResolvedLocation(queryClient);

    expect(getCurrent).toHaveBeenCalledTimes(1);
    expect(detectCurrent).toHaveBeenCalledTimes(2);
  });
});
