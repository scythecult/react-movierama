import type { FilmData } from '../../../common/entities/films';

export class MockFilmDb {
  #films: FilmData[] = [];
  constructor(films: FilmData[]) {
    this.#films = films;
  }

  async findMany() {
    return this.#films;
  }

  async findUnique(id: number) {
    return this.#films.find((item) => item.id === id);
  }

  async create(film: FilmData) {
    return this.#films.push(film);
  }

  async update() {
    return this.#films;
  }
}
