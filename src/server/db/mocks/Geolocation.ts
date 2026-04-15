import type { GeolocationData, LocationsData } from '../../../client/entities/locations/model';

export class MockGeolocationDb {
  #geolocation: LocationsData;
  constructor(geolocation: GeolocationData) {
    this.#geolocation = geolocation;
  }

  async findUnique() {
    return this.#geolocation;
  }

  async update(geolocation: GeolocationData) {
    this.#geolocation = geolocation;

    return this.#geolocation;
  }
}
