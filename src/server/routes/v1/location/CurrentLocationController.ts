import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { SetCurrentLocationRequest } from '../../../../common/entities/locations';
import { ErrorCode } from '../../../lib/errors/CustomError';
import { LocationError, LocationNotFoundError } from '../../../lib/errors/locations/LocationError';
import type { TypedRequest } from '../../../lib/types/request';
import type { DetectCurrentLocationUseCase } from '../../../lib/use-cases/locations/DetectCurrentLocationUseCase';
import type { GetCurrentLocationUseCase } from '../../../lib/use-cases/locations/GetCurrentLocationUseCase';
import type { SetCurrentLocationUseCase } from '../../../lib/use-cases/locations/SetCurrentLocationUseCase';

type CurrentLocationUseCaseMap = {
  getCurrentLocation: GetCurrentLocationUseCase;
  setCurrentLocation: SetCurrentLocationUseCase;
  detectCurrentLocation: DetectCurrentLocationUseCase;
};

export class CurrentLocationController {
  #useCaseMap;

  constructor(useCaseMap: CurrentLocationUseCaseMap) {
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

  get = async (_request: Request, response: Response) => {
    const location = await this.#useCaseMap.getCurrentLocation.execute();

    return response.status(StatusCodes.OK).json({ data: { location } });
  };

  set = async (request: TypedRequest<SetCurrentLocationRequest>, response: Response) => {
    try {
      const location = await this.#useCaseMap.setCurrentLocation.execute({
        locationId: request.body.locationId,
      });

      return response.status(StatusCodes.OK).json({ data: { location } });
    } catch (error) {
      throw this.toLocationHttpError(error);
    }
  };

  detect = async (request: Request, response: Response) => {
    const location = await this.#useCaseMap.detectCurrentLocation.execute({
      ip: request.ip ?? '',
    });

    return response.status(StatusCodes.OK).json({ data: { location } });
  };
}
