import { TEST_MOSCOW_LOCATION } from '../../../../tests/unit/helpers';
import type { CurrentLocationService } from '../../../services/current-location/CurrentLocationService';
import { GetCurrentLocationUseCase } from './GetCurrentLocationUseCase';

describe('GetCurrentLocationUseCase', () => {
  const getOne = vi.fn();
  const currentLocation = { getOne } as unknown as CurrentLocationService;
  const useCase = new GetCurrentLocationUseCase(currentLocation);

  beforeEach(() => {
    getOne.mockReset();
  });

  test('should return null when nothing is selected', async () => {
    getOne.mockResolvedValue(null);

    await expect(useCase.execute()).resolves.toBeNull();
  });

  test('should return null for an unresolved sentinel', async () => {
    getOne.mockResolvedValue({ id: -1, name: 'CANT DETECT LOCATION' });

    await expect(useCase.execute()).resolves.toBeNull();
  });

  test('should return the selected location', async () => {
    getOne.mockResolvedValue(TEST_MOSCOW_LOCATION);

    await expect(useCase.execute()).resolves.toEqual(TEST_MOSCOW_LOCATION);
  });
});
