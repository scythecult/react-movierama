import type { FilmData } from '../../../../common/entities/films';

export type FilmRepository = {
  getAll: () => Promise<FilmData[]>;
};
