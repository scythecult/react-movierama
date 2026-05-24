import { queryOptions } from '@tanstack/react-query';
import { getUser } from './user.loaders';

export const userQueries = {
  all: () => ['users'],

  one: () => [...userQueries.all(), 'one'],
  getOne: () =>
    queryOptions({
      queryKey: userQueries.one(),
      queryFn: getUser,
    }),
};
