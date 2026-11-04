import type { LocationData } from '../../../common/entities/locations';

export class MockCurrentLocationDb {
  #location: LocationData | null;

  constructor(location: LocationData | null) {
    this.#location = location;
  }

  async findUnique() {
    return this.#location;
  }

  async update(location: LocationData) {
    this.#location = location;

    return this.#location;
  }
}
