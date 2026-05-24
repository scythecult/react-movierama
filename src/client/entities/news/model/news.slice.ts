import type { NewsData } from './news.types';

type NewsSliceState = {
  news: NewsData[];
};

export type NewsSlice = NewsSliceState;

export const createNewsSlice: WithMiddlewareStateCreator<NewsSlice> = () => ({
  news: [],
});
