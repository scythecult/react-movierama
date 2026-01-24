import type { Request } from 'express';
import type { GeolocationService } from '../../../services/geolocation/GeolocationService';
import type { LocationService } from '../../../services/locations/LocationService';
import { CityToIdMap } from '../../constants/locations';
import type { GeolocationInterface } from '../../domain/geolocation/Geolocation';

export class GetLocationUseCase {
  #geolocationService: GeolocationService;
  #locationService: LocationService;
  #geolocationApi: GeolocationInterface;

  constructor(
    geolocationService: GeolocationService,
    locationService: LocationService,
    geolocationApi: GeolocationInterface,
  ) {
    this.#geolocationService = geolocationService;
    this.#locationService = locationService;
    this.#geolocationApi = geolocationApi;
  }

  async execute(request: Request) {
    // TODO Get current user location by request user id or ip??
    const { ip } = request;
    // Try to find current location
    let currentLocation = await this.#geolocationService.getOne();

    if (currentLocation.id <= 0 && ip) {
      // If current location is not found, try to find it by ip with ip-api-service
      const cityName = await this.#geolocationApi.getLocation(ip);
      // Try to find location-info in locations-db by id
      const location = await this.#locationService.getOne(CityToIdMap[cityName]);

      currentLocation = location ? location : currentLocation;

      await this.#geolocationService.update(currentLocation);
    }

    return currentLocation;
  }
}
