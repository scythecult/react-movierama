import type { LocationService } from '../../../services/locations/LocationService';

export class ListLocationsUseCase {
  #locations: LocationService;

  constructor(locations: LocationService) {
    this.#locations = locations;
  }

  async execute() {
    return await this.#locations.getAll();
  }
}
