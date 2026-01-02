import { Router } from 'express';
import { AppRoute } from '../../../../common/constants/routes';
import { filmService } from '../../../services/film';
import { FilmsController } from './FilmsController';

const films = Router();

const filmsController = new FilmsController(filmService);

films.get(AppRoute.ROOT, filmsController.listFilms);

export { films };
