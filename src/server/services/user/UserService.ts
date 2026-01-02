import type { MockUserDb } from '../../db/mocks/User';

export class UserService {
  #db;

  constructor(db: MockUserDb) {
    this.#db = db;
  }

  getOne = async (id: number) => {
    return await this.#db.findUnique(id);
  };
}
