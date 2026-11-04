import type { LocationData } from '../../../../common/entities/locations';
import type { CurrentLocationService } from '../../../services/current-location/CurrentLocationService';
import type { LocationService } from '../../../services/locations/LocationService';
import type { IpGeocoder } from '../../infra/geolocation/IpGeocoder';
import { DetectCurrentLocationUseCase } from './DetectCurrentLocationUseCase';

const moscow: LocationData = { id: 1, name: 'Москва и МО' };
const astrakhan: LocationData = { id: 23, name: 'Астрахань' };

describe('DetectCurrentLocationUseCase', () => {
  const findByCityName = vi.fn();
  const getOne = vi.fn();
  const update = vi.fn();
  const resolveCityName = vi.fn();
  const locations = { findByCityName } as unknown as LocationService;
  const currentLocation = { getOne, update } as unknown as CurrentLocationService;
  const geocoder = { resolveCityName } as unknown as IpGeocoder;
  const useCase = new DetectCurrentLocationUseCase(locations, currentLocation, geocoder);

  beforeEach(() => {
    findByCityName.mockReset();
    getOne.mockReset();
    update.mockReset();
    resolveCityName.mockReset();
  });

  test('should return the saved location without calling the geocoder when ip is empty', async () => {
    getOne.mockResolvedValue(moscow);

    await expect(useCase.execute({ ip: '' })).resolves.toEqual(moscow);

    expect(resolveCityName).not.toHaveBeenCalled();
    expect(update).not.toHaveBeenCalled();
  });

  test('should return null when ip is empty and nothing is selected', async () => {
    getOne.mockResolvedValue(null);

    await expect(useCase.execute({ ip: '' })).resolves.toBeNull();
  });

  test('should save the catalog location resolved from the city name', async () => {
    getOne.mockResolvedValue(null);
    resolveCityName.mockResolvedValue('Astrakhan');
    findByCityName.mockResolvedValue(astrakhan);
    update.mockResolvedValue(astrakhan);

    await expect(useCase.execute({ ip: '8.8.8.8' })).resolves.toEqual(astrakhan);

    expect(resolveCityName).toHaveBeenCalledWith('8.8.8.8');
    expect(findByCityName).toHaveBeenCalledWith('Astrakhan');
    expect(update).toHaveBeenCalledWith(astrakhan);
  });

  test('should keep the current location when the city is not in the catalog', async () => {
    getOne.mockResolvedValue(moscow);
    resolveCityName.mockResolvedValue('Unknown');
    findByCityName.mockResolvedValue(undefined);

    await expect(useCase.execute({ ip: '8.8.8.8' })).resolves.toEqual(moscow);

    expect(update).not.toHaveBeenCalled();
  });
});
