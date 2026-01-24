import type { MockSeatTypeDb } from '../../db/mocks/SeatType';

export class SeatTypeService {
  #db;

  constructor(db: MockSeatTypeDb) {
    this.#db = db;
  }

  getAll = async () => {
    return await this.#db.findMany();
  };
}
