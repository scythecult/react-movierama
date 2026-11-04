import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ErrorCode } from '../../../lib/errors/CustomError';
import { HallplanError, HallplanNotFoundError } from '../../../lib/errors/hallplan/HallplanError';
import type { GetHallplanUseCase } from '../../../lib/use-cases/hallplan/GetHallplanUseCase';

type HallplanUseCaseMap = {
  getHallplan: GetHallplanUseCase;
};

export class HallplanController {
  #useCaseMap;

  constructor(useCaseMap: HallplanUseCaseMap) {
    this.#useCaseMap = useCaseMap;
  }

  private toHttpError = (error: unknown) => {
    if (error instanceof HallplanNotFoundError) {
      return new HallplanError({
        statusCode: StatusCodes.NOT_FOUND,
        message: error.message,
        code: ErrorCode.ERR_NF,
        cause: 'locationId',
      });
    }

    return error;
  };

  get = async (request: Request, response: Response) => {
    try {
      const rawLocationId = request.query.locationId;
      const locationId = typeof rawLocationId === 'string' ? Number(rawLocationId) : undefined;
      const hallplan = await this.#useCaseMap.getHallplan.execute({ locationId });

      return response.status(StatusCodes.OK).json({ data: hallplan });
    } catch (error) {
      throw this.toHttpError(error);
    }
  };
}
