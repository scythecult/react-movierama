import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { LocationService } from '../../../services/locations/LocationService';

export class LocationsController {
  #service;

  constructor(service: LocationService) {
    this.#service = service;
  }

  listLocations = async (_: Request, response: Response) => {
    const locations = await this.#service.getAll();

    return response.status(StatusCodes.OK).json({ data: { locations } });
  };
}
