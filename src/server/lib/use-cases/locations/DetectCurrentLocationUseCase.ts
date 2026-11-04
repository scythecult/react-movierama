import type { CurrentLocationService } from '../../../services/current-location/CurrentLocationService';
import type { LocationService } from '../../../services/locations/LocationService';
import type { IpGeocoder } from '../../infra/geolocation/IpGeocoder';

type DetectCurrentLocationCommand = {
  ip: string;
};

const toSelectedLocation = (location: { id: number; name: string } | null) => {
  if (!location || location.id <= 0) {
    return null;
  }

  return location;
};

export class DetectCurrentLocationUseCase {
  #locations: LocationService;
  #currentLocation: CurrentLocationService;
  #geocoder: IpGeocoder;

  constructor(locations: LocationService, currentLocation: CurrentLocationService, geocoder: IpGeocoder) {
    this.#locations = locations;
    this.#currentLocation = currentLocation;
    this.#geocoder = geocoder;
  }

  async execute(command: DetectCurrentLocationCommand) {
    const currentLocation = toSelectedLocation(await this.#currentLocation.getOne());

    if (!command.ip) {
      return currentLocation;
    }

    const cityName = await this.#geocoder.resolveCityName(command.ip);
    const location = await this.#locations.findByCityName(cityName);

    if (!location) {
      return currentLocation;
    }

    return await this.#currentLocation.update(location);
  }
}
