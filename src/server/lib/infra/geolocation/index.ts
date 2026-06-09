import { Config } from '../../../../common/env';
import { GeolocationApi } from './GeolocationApi';
import { GeolocationMockApi } from './GeolocationMockApi';

let geolocationApi = new GeolocationApi();

if (Config.isMockGeolocation) {
  geolocationApi = new GeolocationMockApi();
}

export { geolocationApi };
