import type { CityToIdMapKey } from '../../constants/locations';
import type { GeolocationInterface } from '../../domain/geolocation/Geolocation';

export class IpApiGeolocation implements GeolocationInterface {
  async getLocation(clientIp: string): Promise<CityToIdMapKey> {
    // TODO Refactor
    const response = await fetch('http://ip-api.com/json/');

    if (!response.ok) {
      throw new Error(`Ip-detection service network response was not ok, clientIp: ${clientIp}`);
    }

    const result = await response.json();
    const { city = 'Moscow' }: { city: CityToIdMapKey } = result;

    return city;
  }
}
