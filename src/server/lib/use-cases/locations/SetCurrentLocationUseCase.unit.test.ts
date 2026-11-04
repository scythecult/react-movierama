import type { LocationData } from '../../../../common/entities/locations';
import type { CurrentLocationService } from '../../../services/current-location/CurrentLocationService';
import type { LocationService } from '../../../services/locations/LocationService';
import { LocationNotFoundError } from '../../errors/locations/LocationError';
import { SetCurrentLocationUseCase } from './SetCurrentLocationUseCase';

const moscow: LocationData = { id: 1, name: 'Москва и МО' };

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
    getOne.mockResolvedValue(moscow);
    update.mockResolvedValue(moscow);

    await expect(useCase.execute({ locationId: moscow.id })).resolves.toEqual(moscow);

    expect(getOne).toHaveBeenCalledWith(moscow.id);
    expect(update).toHaveBeenCalledWith(moscow);
  });

  test('should throw and keep the current value when the id is unknown', async () => {
    getOne.mockResolvedValue(undefined);

    await expect(useCase.execute({ locationId: 99 })).rejects.toBeInstanceOf(LocationNotFoundError);

    expect(update).not.toHaveBeenCalled();
  });
});
