export type NewsData = {
  id: number;
  image: string;
  preview: string;
  headline: string;
  addedAt: string;
};

export type NewsResponse = {
  news: NewsData[];
};
