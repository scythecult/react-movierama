import type { FilmData } from './films.types';

type FilmsSliceState = {
  films: FilmData[];
};

export type FilmsSlice = FilmsSliceState;

export const createFilmsSlice: WithMiddlewareStateCreator<FilmsSlice> = () => ({
  films: [],
});
