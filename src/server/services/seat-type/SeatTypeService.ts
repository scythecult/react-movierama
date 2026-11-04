import type { MockSeatTypeDb } from '../../db/mocks/SeatType';
import type { SeatTypeRepository } from '../../lib/ports/hallplan/SeatTypeRepository';

export class SeatTypeService implements SeatTypeRepository {
  #db;

  constructor(db: MockSeatTypeDb) {
    this.#db = db;
  }

  getAll = async () => {
    return await this.#db.findMany();
  };
}
