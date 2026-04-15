export const FilmsQueryKey = {
  all: ['films'] as const,

  films: () => [FilmsQueryKey.all, 'films'] as const,
};
