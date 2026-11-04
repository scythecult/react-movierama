import type { LocationService } from '../../../services/locations/LocationService';
import { LocationNotFoundError } from '../../errors/locations/LocationError';

type GetLocationCommand = {
  locationId: number;
};

export class GetLocationUseCase {
  #locations: LocationService;

  constructor(locations: LocationService) {
    this.#locations = locations;
  }

  async execute(command: GetLocationCommand) {
    const location = await this.#locations.getOne(command.locationId);

    if (!location) {
      throw new LocationNotFoundError();
    }

    return location;
  }
}
