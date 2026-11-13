import { Config } from '../../src/common/env';

const MOCK_CITY_NAME = 'Astrakhan';
const LOCAL_CITY_NAME = 'Moscow';

// Express always has a socket address. A mocked request does not, so a missing
// forwarding header stands in for localhost. An explicit empty header matches
// DetectCurrentLocationUseCase and skips geocoding.
export const resolveClientIp = (request: Request) => {
  const forwarded = request.headers.get('x-forwarded-for');

  if (forwarded === null) {
    return '127.0.0.1';
  }

  const ip = forwarded.split(',')[0]?.trim() ?? '';

  return ip || undefined;
};

// GeolocationMockApi always returns Astrakhan. GeolocationApi ignores the
// client IP locally and falls back to Moscow, so the mock does not call ip-api.
export const resolveCityName = () => (Config.isMockGeolocation ? MOCK_CITY_NAME : LOCAL_CITY_NAME);
