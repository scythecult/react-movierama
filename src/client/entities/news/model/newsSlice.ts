import type { NewsData } from './types';

type NewsSliceState = {
  news: NewsData[];
};

export type NewsSlice = NewsSliceState;

export const createNewsSlice: WithMiddlewareStateCreator<NewsSlice> = () => ({
  news: [],
});
