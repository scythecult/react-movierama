export interface IpGeocoder {
  resolveCityName: (ip: string) => Promise<string>;
}
