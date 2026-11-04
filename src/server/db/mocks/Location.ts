import type { LocationData } from '../../../common/entities/locations';

export type LocationRecord = LocationData & {
  alias?: string;
};

const toLocation = (record: LocationRecord): LocationData => ({
  id: record.id,
  name: record.name,
});

export class MockLocationDb {
  #locations: LocationRecord[];

  constructor(locations: LocationRecord[]) {
    this.#locations = locations;
  }

  async findMany() {
    return this.#locations.map(toLocation);
  }

  async findUnique(id: number) {
    const location = this.#locations.find((item) => item.id === id);

    return location ? toLocation(location) : undefined;
  }

  async findByCityName(cityName: string) {
    const location = this.#locations.find(({ alias }) => alias === cityName);

    return location ? toLocation(location) : undefined;
  }
}
