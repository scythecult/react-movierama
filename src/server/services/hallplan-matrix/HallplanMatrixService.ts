import type { MockHallplanMatrixDb } from '../../db/mocks/HallplanMatrix';

export class HallplanMatrixService {
  #db;

  constructor(db: MockHallplanMatrixDb) {
    this.#db = db;
  }

  getOne = async (id: number) => {
    return await this.#db.findUnique(id);
  };
}
