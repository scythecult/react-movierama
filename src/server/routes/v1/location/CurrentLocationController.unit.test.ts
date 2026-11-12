import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  captureError,
  createMockResponse,
  TEST_ASTRAKHAN_LOCATION,
  TEST_MOSCOW_LOCATION,
} from '../../../../tests/unit/helpers';
import { ErrorCode } from '../../../lib/errors/CustomError';
import { LocationError, LocationNotFoundError } from '../../../lib/errors/locations/LocationError';
import type { DetectCurrentLocationUseCase } from '../../../lib/use-cases/locations/DetectCurrentLocationUseCase';
import type { GetCurrentLocationUseCase } from '../../../lib/use-cases/locations/GetCurrentLocationUseCase';
import type { SetCurrentLocationUseCase } from '../../../lib/use-cases/locations/SetCurrentLocationUseCase';
import { CurrentLocationController } from './CurrentLocationController';

describe('CurrentLocationController', () => {
  const getCurrentLocation = { execute: vi.fn() };
  const setCurrentLocation = { execute: vi.fn() };
  const detectCurrentLocation = { execute: vi.fn() };
  let controller: CurrentLocationController;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    getCurrentLocation.execute.mockReset();
    setCurrentLocation.execute.mockReset();
    detectCurrentLocation.execute.mockReset();

    controller = new CurrentLocationController({
      getCurrentLocation: getCurrentLocation as unknown as GetCurrentLocationUseCase,
      setCurrentLocation: setCurrentLocation as unknown as SetCurrentLocationUseCase,
      detectCurrentLocation: detectCurrentLocation as unknown as DetectCurrentLocationUseCase,
    });

    mockResponse = createMockResponse();
  });

  test('should return the saved location', async () => {
    const location = TEST_MOSCOW_LOCATION;
    getCurrentLocation.execute.mockResolvedValue(location);

    await controller.get({} as Request, mockResponse as Response);

    expect(getCurrentLocation.execute).toHaveBeenCalledWith();
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { location } });
  });

  test('should return null when the location is not selected', async () => {
    getCurrentLocation.execute.mockResolvedValue(null);

    await controller.get({} as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith({ data: { location: null } });
  });

  test('should replace the current location', async () => {
    const location = { id: 7, name: 'Казань' };
    const request = { body: { locationId: 7 } } as unknown as Request;
    setCurrentLocation.execute.mockResolvedValue(location);

    await controller.set(request, mockResponse as Response);

    expect(setCurrentLocation.execute).toHaveBeenCalledWith({ locationId: 7 });
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { location } });
  });

  test('should map an unknown location id to 404', async () => {
    const domainError = new LocationNotFoundError();
    const request = { body: { locationId: 99 } } as unknown as Request;
    setCurrentLocation.execute.mockRejectedValue(domainError);

    const error = await captureError(() => controller.set(request, mockResponse as Response));

    expect(error).toBeInstanceOf(LocationError);
    expect(error).toMatchObject({
      statusCode: StatusCodes.NOT_FOUND,
      message: domainError.message,
      code: ErrorCode.ERR_NF,
      cause: 'locationId',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  test('should detect the location by request ip', async () => {
    const location = TEST_ASTRAKHAN_LOCATION;
    const request = { ip: '8.8.8.8' } as unknown as Request;
    detectCurrentLocation.execute.mockResolvedValue(location);

    await controller.detect(request, mockResponse as Response);

    expect(detectCurrentLocation.execute).toHaveBeenCalledWith({ ip: '8.8.8.8' });
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { location } });
  });
});
