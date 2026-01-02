import type { Film } from '../../../common/types/film';

export class MockFilmDb {
  #films: Film[] = [];
  constructor(films: Film[]) {
    this.#films = films;
  }

  async findMany() {
    return this.#films;
  }

  async findUnique(id: number) {
    return this.#films.find((item) => item.id === id);
  }

  async create(film: Film) {
    return this.#films.push(film);
  }

  async update() {
    return this.#films;
  }
}
