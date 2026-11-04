import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ErrorCode } from '../../../lib/errors/CustomError';
import { LocationError, LocationNotFoundError } from '../../../lib/errors/locations/LocationError';
import type { GetLocationUseCase } from '../../../lib/use-cases/locations/GetLocationUseCase';
import type { ListLocationsUseCase } from '../../../lib/use-cases/locations/ListLocationsUseCase';
import { LocationsController } from './LocationsController';

const captureError = async (action: () => Promise<unknown>) => {
  try {
    await action();
  } catch (error) {
    return error;
  }

  throw new Error('Expected the action to throw');
};

describe('LocationsController', () => {
  const listLocations = { execute: vi.fn() };
  const getLocation = { execute: vi.fn() };
  let controller: LocationsController;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    listLocations.execute.mockReset();
    getLocation.execute.mockReset();

    controller = new LocationsController({
      listLocations: listLocations as unknown as ListLocationsUseCase,
      getLocation: getLocation as unknown as GetLocationUseCase,
    });

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

  test('should return the location catalog', async () => {
    const locations = [{ id: 1, name: 'Москва и МО' }];
    listLocations.execute.mockResolvedValue(locations);

    await controller.list({} as Request, mockResponse as Response);

    expect(listLocations.execute).toHaveBeenCalledWith();
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { locations } });
  });

  test('should return one location', async () => {
    const location = { id: 1, name: 'Москва и МО' };
    const request = { params: { id: '1' } } as unknown as Request;
    getLocation.execute.mockResolvedValue(location);

    await controller.get(request, mockResponse as Response);

    expect(getLocation.execute).toHaveBeenCalledWith({ locationId: 1 });
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { location } });
  });

  test('should map a missing location to 404', async () => {
    const domainError = new LocationNotFoundError();
    const request = { params: { id: '99' } } as unknown as Request;
    getLocation.execute.mockRejectedValue(domainError);

    const error = await captureError(() => controller.get(request, mockResponse as Response));

    expect(error).toBeInstanceOf(LocationError);
    expect(error).toMatchObject({
      statusCode: StatusCodes.NOT_FOUND,
      message: domainError.message,
      code: ErrorCode.ERR_NF,
      cause: 'locationId',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });
});
