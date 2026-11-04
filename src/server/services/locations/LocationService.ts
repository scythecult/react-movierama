import type { MockLocationDb } from '../../db/mocks/Location';
import type { LocationRepository } from '../../lib/ports/locations/LocationRepository';

export class LocationService implements LocationRepository {
  #db;

  constructor(db: MockLocationDb) {
    this.#db = db;
  }

  getAll = async () => {
    return await this.#db.findMany();
  };

  getOne = async (id: number) => {
    return await this.#db.findUnique(id);
  };

  findByCityName = async (cityName: string) => {
    return await this.#db.findByCityName(cityName);
  };
}
