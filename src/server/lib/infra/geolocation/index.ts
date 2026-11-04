import { Config } from '../../../../common/env';
import { GeolocationApi } from './GeolocationApi';
import { GeolocationMockApi } from './GeolocationMockApi';
import type { IpGeocoder } from './IpGeocoder';

let ipGeocoder: IpGeocoder = new GeolocationApi();

if (Config.isMockGeolocation) {
  ipGeocoder = new GeolocationMockApi();
}

export { ipGeocoder };
