import type { FilmData } from './types';

type FilmsSliceState = {
  films: FilmData[];
};

export type FilmsSlice = FilmsSliceState;

export const createFilmsSlice: WithMiddlewareStateCreator<FilmsSlice> = () => ({
  films: [],
});
