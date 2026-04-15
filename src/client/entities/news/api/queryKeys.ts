export const NewsQueryKey = {
  all: ['news'] as const,

  news: () => [NewsQueryKey.all, 'news'] as const,
};
