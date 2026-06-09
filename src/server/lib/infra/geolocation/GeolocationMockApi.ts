import type { CityToIdMapKey } from '../../constants/locations';
import type { GeolocationInterface } from '../../types/geolocation';

export class GeolocationMockApi implements GeolocationInterface {
  async getLocation(_: string): Promise<CityToIdMapKey> {
    return 'Astrakhan';
  }
}
