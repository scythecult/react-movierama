import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { GeolocationUseCaseMap } from '../../../lib/types/useCase';
import type { LocationService } from '../../../services/locations/LocationService';

export class GeolocationController {
  #service;
  #useCaseMap;

  constructor(service: LocationService, useCaseMap: GeolocationUseCaseMap) {
    this.#service = service;
    this.#useCaseMap = useCaseMap;
  }

  getGeolocation = async (request: Request, response: Response) => {
    const location = await this.#useCaseMap.getLocationUseCase.execute(request);

    console.log({ location });

    return response.status(StatusCodes.OK).json({ data: { location } });
  };
}
