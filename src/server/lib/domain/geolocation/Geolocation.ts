import type { CityToIdMapKey } from '../../constants/locations';

export interface GeolocationInterface {
  getLocation: (clientIp: string) => Promise<CityToIdMapKey>;
}
