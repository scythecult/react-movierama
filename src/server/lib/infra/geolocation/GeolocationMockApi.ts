import type { IpGeocoder } from './IpGeocoder';

export class GeolocationMockApi implements IpGeocoder {
  async resolveCityName(_ip: string) {
    return 'Astrakhan';
  }
}
