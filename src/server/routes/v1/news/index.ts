import { Router } from 'express';
import { AppRoute } from '../../../../common/constants/routes';
import { ListNewsUseCase } from '../../../lib/use-cases/news/ListNewsUseCase';
import { newsService } from '../../../services/news';
import { NewsController } from './NewsController';

const news = Router();

const newsController = new NewsController({
  listNews: new ListNewsUseCase(newsService),
});

news.get(AppRoute.ROOT, newsController.list);

export { news };
