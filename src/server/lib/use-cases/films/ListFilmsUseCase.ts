import type { FilmService } from '../../../services/film/FilmService';

export class ListFilmsUseCase {
  #films: FilmService;

  constructor(films: FilmService) {
    this.#films = films;
  }

  async execute() {
    return await this.#films.getAll();
  }
}
