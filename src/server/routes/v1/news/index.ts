import { Router } from 'express';
import { AppRoute } from '../../../../common/constants/routes';
import { newsService } from '../../../services/news';
import { NewsController } from './NewsController';

const news = Router();

const newsController = new NewsController(newsService);

news.get(AppRoute.ROOT, newsController.listNews);

export { news };
