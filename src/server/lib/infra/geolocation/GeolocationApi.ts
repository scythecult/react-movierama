import type { IpGeocoder } from './IpGeocoder';

const DEFAULT_CITY_NAME = 'Moscow';

export class GeolocationApi implements IpGeocoder {
  async resolveCityName(clientIp: string): Promise<string> {
    // TODO clientIp - now is detecting like localhost, api doesn't provide correct location
    // const url = clientIp ? `http://ip-api.com/json/${encodeURIComponent(clientIp)}` : 'http://ip-api.com/json/';
    const url = 'http://ip-api.com/json/';
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ip-detection service network response was not ok, clientIp: ${clientIp}`);
    }

    const result: { city?: string } = await response.json();

    return result.city || DEFAULT_CITY_NAME;
  }
}
