import type { LocationData } from '../../src/common/entities/locations';
import { mockApiStore } from '../state/store';
import { PERSISTENT_MAX_AGE, readCookie, serializeCookie, withCookies } from './cookies';

const LOCATION_COOKIE = 'seats.location';

export const readCurrentLocation = (request: Request) => {
  const raw = readCookie(request, LOCATION_COOKIE);
  const cookieId = raw ? Number(raw) : Number.NaN;
  const fromCookie = Number.isInteger(cookieId) ? mockApiStore.findLocation(cookieId) : undefined;

  if (fromCookie) {
    return mockApiStore.setLocation(fromCookie);
  }

  return mockApiStore.getLocation();
};

export const rememberLocation = (response: Response, location: LocationData) => {
  mockApiStore.setLocation(location);

  return withCookies(response, [serializeCookie(LOCATION_COOKIE, String(location.id), PERSISTENT_MAX_AGE)]);
};
