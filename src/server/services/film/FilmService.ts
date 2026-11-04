import type { MockFilmDb } from '../../db/mocks/Film';
import type { FilmRepository } from '../../lib/ports/film/FilmRepository';

export class FilmService implements FilmRepository {
  #db;

  constructor(db: MockFilmDb) {
    this.#db = db;
  }

  getAll = async () => {
    return await this.#db.findMany();
  };
}
