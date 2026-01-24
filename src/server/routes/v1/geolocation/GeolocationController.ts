import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { GeolocationUseCaseMap } from '../../../lib/types/useCase';
import type { GeolocationService } from '../../../services/geolocation/GeolocationService';
import type { LocationService } from '../../../services/locations/LocationService';

export class GeolocationController {
  #geolocationService;
  #locationService;
  #useCaseMap;

  constructor(
    geolocationService: GeolocationService,
    locationService: LocationService,
    useCaseMap: GeolocationUseCaseMap,
  ) {
    this.#geolocationService = geolocationService;
    this.#locationService = locationService;
    this.#useCaseMap = useCaseMap;
  }

  getGeolocation = async (request: Request, response: Response) => {
    const location = await this.#useCaseMap.getLocationUseCase.execute(request);

    return response.status(StatusCodes.OK).json({ data: { location } });
  };

  postGeolocation = async (request: Request, response: Response) => {
    const { id } = request.body;
    const currentLocation = await this.#geolocationService.getOne();
    const location = await this.#locationService.getOne(id);
    const locationFinal = location ? location : currentLocation;

    await this.#geolocationService.update(locationFinal);

    return response.status(StatusCodes.OK).json({ data: { location: locationFinal } });
  };
}
