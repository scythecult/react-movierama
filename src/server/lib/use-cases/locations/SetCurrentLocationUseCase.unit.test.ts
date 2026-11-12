import { TEST_MOSCOW_LOCATION } from '../../../../tests/unit/helpers';
import type { CurrentLocationService } from '../../../services/current-location/CurrentLocationService';
import type { LocationService } from '../../../services/locations/LocationService';
import { LocationNotFoundError } from '../../errors/locations/LocationError';
import { SetCurrentLocationUseCase } from './SetCurrentLocationUseCase';

describe('SetCurrentLocationUseCase', () => {
  const getOne = vi.fn();
  const update = vi.fn();
  const locations = { getOne } as unknown as LocationService;
  const currentLocation = { update } as unknown as CurrentLocationService;
  const useCase = new SetCurrentLocationUseCase(locations, currentLocation);

  beforeEach(() => {
    getOne.mockReset();
    update.mockReset();
  });

  test('should store the catalog location', async () => {
    getOne.mockResolvedValue(TEST_MOSCOW_LOCATION);
    update.mockResolvedValue(TEST_MOSCOW_LOCATION);

    await expect(useCase.execute({ locationId: TEST_MOSCOW_LOCATION.id })).resolves.toEqual(TEST_MOSCOW_LOCATION);

    expect(getOne).toHaveBeenCalledWith(TEST_MOSCOW_LOCATION.id);
    expect(update).toHaveBeenCalledWith(TEST_MOSCOW_LOCATION);
  });

  test('should throw and keep the current value when the id is unknown', async () => {
    getOne.mockResolvedValue(undefined);

    await expect(useCase.execute({ locationId: 99 })).rejects.toBeInstanceOf(LocationNotFoundError);

    expect(update).not.toHaveBeenCalled();
  });
});
