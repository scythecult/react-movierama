import { StatusCodes } from 'http-status-codes';
import { http } from 'msw';
import { AppRoute } from '../../src/common/constants/routes';
import { getHallplanQuerySchema } from '../../src/common/entities/hallplan';
import { ErrorCode } from '../../src/server/lib/errors/CustomError';
import { MOCK_CANVAS_SIZE, MOCK_SEAT_TYPES, MOCK_SEATS_DATA } from '../data/seats';
import { apiUrl, domainError, jsonData } from '../helpers/http';
import { readCurrentLocation } from '../helpers/location';
import { parseWithSchema } from '../helpers/validation';
import { mockApiStore } from '../state/store';

const hallplanData = {
  seats: MOCK_SEATS_DATA,
  canvas: MOCK_CANVAS_SIZE,
  seatTypes: MOCK_SEAT_TYPES,
};

export const hallplanHandlers = [
  http.get(apiUrl(AppRoute.HALLPLAN), ({ request }) => {
    const query = Object.fromEntries(new URL(request.url).searchParams);
    const parsed = parseWithSchema(getHallplanQuerySchema, query);

    if (parsed instanceof Response) {
      return parsed;
    }

    const requestedId = parsed.locationId;
    const locationId = requestedId && requestedId > 0 ? requestedId : readCurrentLocation(request)?.id;

    if (!locationId) {
      return domainError(StatusCodes.NOT_FOUND, 'Location is not selected', ErrorCode.ERR_NF, 'locationId');
    }

    if (!mockApiStore.findLocation(locationId)) {
      return domainError(StatusCodes.NOT_FOUND, 'Hallplan not found', ErrorCode.ERR_NF, 'locationId');
    }

    return jsonData(hallplanData);
  }),
];
