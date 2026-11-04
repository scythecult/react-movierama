import type { LocationData } from '../../../../common/entities/locations';
import type { LocationService } from '../../../services/locations/LocationService';
import { LocationNotFoundError } from '../../errors/locations/LocationError';
import { GetLocationUseCase } from './GetLocationUseCase';

const moscow: LocationData = { id: 1, name: 'Москва и МО' };

describe('GetLocationUseCase', () => {
  const getOne = vi.fn();
  const locations = { getOne } as unknown as LocationService;
  const useCase = new GetLocationUseCase(locations);

  beforeEach(() => {
    getOne.mockReset();
  });

  test('should return the catalog location', async () => {
    getOne.mockResolvedValue(moscow);

    await expect(useCase.execute({ locationId: moscow.id })).resolves.toEqual(moscow);

    expect(getOne).toHaveBeenCalledWith(moscow.id);
  });

  test('should throw when the location is missing', async () => {
    getOne.mockResolvedValue(undefined);

    await expect(useCase.execute({ locationId: 99 })).rejects.toBeInstanceOf(LocationNotFoundError);
  });
});
