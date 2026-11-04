import type { MockNewsDb } from '../../db/mocks/News';
import type { NewsRepository } from '../../lib/ports/news/NewsRepository';

export class NewsService implements NewsRepository {
  #db;

  constructor(db: MockNewsDb) {
    this.#db = db;
  }

  getAll = async () => {
    return await this.#db.findMany();
  };
}
