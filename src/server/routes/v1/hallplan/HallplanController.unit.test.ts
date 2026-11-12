import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { captureError, createMockResponse } from '../../../../tests/unit/helpers';
import { ErrorCode } from '../../../lib/errors/CustomError';
import { HallplanError, HallplanNotFoundError } from '../../../lib/errors/hallplan/HallplanError';
import type { GetHallplanUseCase } from '../../../lib/use-cases/hallplan/GetHallplanUseCase';
import { HallplanController } from './HallplanController';

describe('HallplanController', () => {
  const execute = vi.fn();
  let controller: HallplanController;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    execute.mockReset();
    controller = new HallplanController({ getHallplan: { execute } as unknown as GetHallplanUseCase });
    mockResponse = createMockResponse();
  });

  test('should return the hallplan for a location query', async () => {
    const hallplan = { seats: [], canvas: { width: 1, height: 1 }, seatTypes: [] };
    const request = { query: { locationId: '20' } } as unknown as Request;
    execute.mockResolvedValue(hallplan);

    await controller.get(request, mockResponse as Response);

    expect(execute).toHaveBeenCalledWith({ locationId: 20 });
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: hallplan });
  });

  test('should omit locationId when the query does not include it', async () => {
    const request = { query: {} } as unknown as Request;
    execute.mockResolvedValue({ seats: [], canvas: { width: 0, height: 0 }, seatTypes: [] });

    await controller.get(request, mockResponse as Response);

    expect(execute).toHaveBeenCalledWith({ locationId: undefined });
  });

  test('should map a missing hallplan to 404', async () => {
    const domainError = new HallplanNotFoundError();
    const request = { query: { locationId: '99' } } as unknown as Request;
    execute.mockRejectedValue(domainError);

    const error = await captureError(() => controller.get(request, mockResponse as Response));

    expect(error).toBeInstanceOf(HallplanError);
    expect(error).toMatchObject({
      statusCode: StatusCodes.NOT_FOUND,
      message: domainError.message,
      code: ErrorCode.ERR_NF,
      cause: 'locationId',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });
});
