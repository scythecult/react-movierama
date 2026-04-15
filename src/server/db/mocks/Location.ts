import type { LocationsData } from '../../../client/entities/locations/ui';

export class MockLocationDb {
  #locations: LocationsData[] = [];
  constructor(locations: LocationsData[]) {
    this.#locations = locations;
  }

  async findMany() {
    return this.#locations;
  }

  async findUnique(id: number) {
    return this.#locations.find((item) => item.id === id);
  }

  async update() {
    return this.#locations;
  }
}
