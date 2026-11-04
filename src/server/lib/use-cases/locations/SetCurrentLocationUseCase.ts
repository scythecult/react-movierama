import type { CurrentLocationService } from '../../../services/current-location/CurrentLocationService';
import type { LocationService } from '../../../services/locations/LocationService';
import { LocationNotFoundError } from '../../errors/locations/LocationError';

type SetCurrentLocationCommand = {
  locationId: number;
};

export class SetCurrentLocationUseCase {
  #locations: LocationService;
  #currentLocation: CurrentLocationService;

  constructor(locations: LocationService, currentLocation: CurrentLocationService) {
    this.#locations = locations;
    this.#currentLocation = currentLocation;
  }

  async execute(command: SetCurrentLocationCommand) {
    const location = await this.#locations.getOne(command.locationId);

    if (!location) {
      throw new LocationNotFoundError();
    }

    return await this.#currentLocation.update(location);
  }
}
