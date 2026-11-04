import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ErrorCode } from '../../../lib/errors/CustomError';
import { LocationError, LocationNotFoundError } from '../../../lib/errors/locations/LocationError';
import type { GetLocationUseCase } from '../../../lib/use-cases/locations/GetLocationUseCase';
import type { ListLocationsUseCase } from '../../../lib/use-cases/locations/ListLocationsUseCase';

type LocationsUseCaseMap = {
  listLocations: ListLocationsUseCase;
  getLocation: GetLocationUseCase;
};

export class LocationsController {
  #useCaseMap;

  constructor(useCaseMap: LocationsUseCaseMap) {
    this.#useCaseMap = useCaseMap;
  }

  private toLocationHttpError = (error: unknown) => {
    if (error instanceof LocationNotFoundError) {
      return new LocationError({
        statusCode: StatusCodes.NOT_FOUND,
        message: error.message,
        code: ErrorCode.ERR_NF,
        cause: 'locationId',
      });
    }

    return error;
  };

  list = async (_request: Request, response: Response) => {
    const locations = await this.#useCaseMap.listLocations.execute();

    return response.status(StatusCodes.OK).json({ data: { locations } });
  };

  get = async (request: Request, response: Response) => {
    try {
      const location = await this.#useCaseMap.getLocation.execute({
        locationId: Number(request.params.id),
      });

      return response.status(StatusCodes.OK).json({ data: { location } });
    } catch (error) {
      throw this.toLocationHttpError(error);
    }
  };
}
