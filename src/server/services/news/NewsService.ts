import type { MockNewsDb } from '../../db/mocks/News';

export class NewsService {
  #db;

  constructor(db: MockNewsDb) {
    this.#db = db;
  }

  getAll = async () => {
    return await this.#db.findMany();
  };
}
