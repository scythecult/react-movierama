import { Router } from 'express';
import { AppRoute } from '../../../../common/constants/routes';
import { ListFilmsUseCase } from '../../../lib/use-cases/films/ListFilmsUseCase';
import { filmService } from '../../../services/film';
import { FilmsController } from './FilmsController';

const films = Router();

const filmsController = new FilmsController({
  listFilms: new ListFilmsUseCase(filmService),
});

films.get(AppRoute.ROOT, filmsController.list);

export { films };
