import { mockNewsDb } from '../../db/mocks';
import { NewsService } from './NewsService';

export const newsService = new NewsService(mockNewsDb);
