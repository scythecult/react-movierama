import type { Request } from 'express';
import type { GeolocationService } from '../../../services/geolocation/GeolocationService';
import type { LocationService } from '../../../services/locations/LocationService';
import { CityToIdMap } from '../../constants/locations';
import type { GeolocationInterface } from '../../domain/geolocation/Geolocation';

export class GetLocationUseCase {
  #geolocationService: GeolocationService;
  #locationService: LocationService;
  #geolocation: GeolocationInterface;
  constructor(
    geolocationService: GeolocationService,
    locationService: LocationService,
    geolocation: GeolocationInterface,
  ) {
    this.#geolocationService = geolocationService;
    this.#locationService = locationService;
    this.#geolocation = geolocation;
  }

  async execute(request: Request) {
    let currentLocation = await this.#geolocationService.getOne();

    if (currentLocation.id <= 0) {
      const cityName = await this.#geolocation.getLocation('1.1.1.1');
      const prevLocation = await this.#locationService.getOne(CityToIdMap[cityName]);

      console.log({ prevLocation, cityName });
      currentLocation = prevLocation ? prevLocation : currentLocation;
    }

    console.log({ currentLocation });

    await this.#geolocationService.update(currentLocation);

    return currentLocation;
  }
}
