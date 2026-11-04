import type { NewsData } from '../../../../common/entities/news';

export type NewsRepository = {
  getAll: () => Promise<NewsData[]>;
};
