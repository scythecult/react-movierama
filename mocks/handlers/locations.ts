import { StatusCodes } from 'http-status-codes';
import { http } from 'msw';
import { AppRoute } from '../../src/common/constants/routes';
import { locationParamsSchema } from '../../src/common/entities/locations';
import { ErrorCode } from '../../src/server/lib/errors/CustomError';
import { apiUrl, domainError, jsonData } from '../helpers/http';
import { parseWithSchema } from '../helpers/validation';
import { mockApiStore } from '../state/store';

export const locationsHandlers = [
  http.get(apiUrl(AppRoute.LOCATIONS), () => {
    return jsonData({
      locations: mockApiStore.listLocations(),
    });
  }),

  http.get(apiUrl(`${AppRoute.LOCATIONS}/:id`), ({ params }) => {
    const parsed = parseWithSchema(locationParamsSchema, { id: params.id });

    if (parsed instanceof Response) {
      return parsed;
    }

    const location = mockApiStore.findLocation(parsed.id);

    if (!location) {
      return domainError(StatusCodes.NOT_FOUND, 'Location not found', ErrorCode.ERR_NF, 'locationId');
    }

    return jsonData({ location });
  }),
];
