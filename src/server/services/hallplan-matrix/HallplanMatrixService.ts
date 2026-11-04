import type { MockHallplanMatrixDb } from '../../db/mocks/HallplanMatrix';
import type { HallplanRepository } from '../../lib/ports/hallplan/HallplanRepository';

export class HallplanMatrixService implements HallplanRepository {
  #db;

  constructor(db: MockHallplanMatrixDb) {
    this.#db = db;
  }

  getByLocationId = async (locationId: number) => {
    return await this.#db.findUnique(locationId);
  };
}
