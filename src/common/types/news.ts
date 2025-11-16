export type NewsItem = {
  id: number;
  image: string;
  preview: string;
  headline: string;
  addedAt: string;
};

export type NewsData = {
  news: NewsItem[];
};
