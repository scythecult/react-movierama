import type { CurrentLocationService } from '../../../services/current-location/CurrentLocationService';

export class GetCurrentLocationUseCase {
  #currentLocation: CurrentLocationService;

  constructor(currentLocation: CurrentLocationService) {
    this.#currentLocation = currentLocation;
  }

  async execute() {
    const location = await this.#currentLocation.getOne();

    if (!location || location.id <= 0) {
      return null;
    }

    return location;
  }
}
