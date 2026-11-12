import { TEST_MOSCOW_LOCATION } from '../../../../tests/unit/helpers';
import type { LocationService } from '../../../services/locations/LocationService';
import { LocationNotFoundError } from '../../errors/locations/LocationError';
import { GetLocationUseCase } from './GetLocationUseCase';

describe('GetLocationUseCase', () => {
  const getOne = vi.fn();
  const locations = { getOne } as unknown as LocationService;
  const useCase = new GetLocationUseCase(locations);

  beforeEach(() => {
    getOne.mockReset();
  });

  test('should return the catalog location', async () => {
    getOne.mockResolvedValue(TEST_MOSCOW_LOCATION);

    await expect(useCase.execute({ locationId: TEST_MOSCOW_LOCATION.id })).resolves.toEqual(TEST_MOSCOW_LOCATION);

    expect(getOne).toHaveBeenCalledWith(TEST_MOSCOW_LOCATION.id);
  });

  test('should throw when the location is missing', async () => {
    getOne.mockResolvedValue(undefined);

    await expect(useCase.execute({ locationId: 99 })).rejects.toBeInstanceOf(LocationNotFoundError);
  });
});
