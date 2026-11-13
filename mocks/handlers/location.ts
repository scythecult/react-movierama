import { StatusCodes } from 'http-status-codes';
import { http } from 'msw';
import { ApiRoute, AppRoute } from '../../src/common/constants/routes';
import { setCurrentLocationSchema } from '../../src/common/entities/locations';
import { ErrorCode } from '../../src/server/lib/errors/CustomError';
import { resolveCityName, resolveClientIp } from '../helpers/geolocation';
import { apiUrl, domainError, jsonData, readJsonBody } from '../helpers/http';
import { readCurrentLocation, rememberLocation } from '../helpers/location';
import { parseWithSchema } from '../helpers/validation';
import { mockApiStore } from '../state/store';

export const locationHandlers = [
  http.get(apiUrl(`${AppRoute.LOCATION}${ApiRoute.DETECT}`), ({ request }) => {
    const current = readCurrentLocation(request);
    const ip = resolveClientIp(request);

    if (!ip) {
      return jsonData({ location: current });
    }

    const location = mockApiStore.findLocationByCity(resolveCityName());

    if (!location) {
      return jsonData({ location: current });
    }

    return rememberLocation(jsonData({ location }), location);
  }),

  http.get(apiUrl(AppRoute.LOCATION), ({ request }) => {
    return jsonData({
      location: readCurrentLocation(request),
    });
  }),

  http.put(apiUrl(AppRoute.LOCATION), async ({ request }) => {
    const body = await readJsonBody(request);

    if (body instanceof Response) {
      return body;
    }

    const parsed = parseWithSchema(setCurrentLocationSchema, body);

    if (parsed instanceof Response) {
      return parsed;
    }

    const location = mockApiStore.findLocation(parsed.locationId);

    if (!location) {
      return domainError(StatusCodes.NOT_FOUND, 'Location not found', ErrorCode.ERR_NF, 'locationId');
    }

    return rememberLocation(jsonData({ location }), location);
  }),
];
