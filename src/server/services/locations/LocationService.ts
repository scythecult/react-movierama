import type { MockLocationDb } from '../../db/mocks/Location';

export class LocationService {
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
}
