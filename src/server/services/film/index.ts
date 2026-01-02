import { mockFilmDb } from '../../db/mocks';
import { FilmService } from './FilmService';

export const filmService = new FilmService(mockFilmDb);
