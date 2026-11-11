import type { FilmData } from '../../../../common/entities/films';
import type { NewsData } from '../../../../common/entities/news';
import { filmsQueries } from '../../../entities/films/api';
import { newsQueries } from '../../../entities/news/api';
import { loadQuery } from '../../../shared/api/load-query';
import { getRouteQueryClient } from '../../../shared/api/query-client';

export const mainLoader = async () => {
  const queryClient = getRouteQueryClient();
  const [films, news] = await Promise.all([
    loadQuery<FilmData[]>(queryClient, filmsQueries.list()),
    loadQuery<NewsData[]>(queryClient, newsQueries.list()),
  ]);

  return {
    films: films ?? null,
    news: news ?? null,
  };
};
