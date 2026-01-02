import type { MockFilmDb } from '../../db/mocks/Film';

export class FilmService {
  #db;

  constructor(db: MockFilmDb) {
    this.#db = db;
  }

  getAll = async () => {
    return await this.#db.findMany();
  };
}
