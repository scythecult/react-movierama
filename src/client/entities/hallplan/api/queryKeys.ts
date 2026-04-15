export const HallplanQueryKey = {
  all: ['hallplan'] as const,

  hallplan: () => [HallplanQueryKey.all, 'hallplan'] as const,
};
