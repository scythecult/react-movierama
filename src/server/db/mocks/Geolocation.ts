import type { GeolocationData } from '../../../common/types/geolocation';
import type { LocationsData } from '../../../common/types/locations';

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
