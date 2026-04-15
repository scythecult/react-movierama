// TODO Read about query keys semantic-naming
// TODO Use AppRoute.key as query key

export const UserQueryKey = {
  all: ['user'] as const,

  user: () => [UserQueryKey.all, 'user'] as const,
};
