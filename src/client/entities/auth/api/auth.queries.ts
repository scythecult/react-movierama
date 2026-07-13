import { queryOptions } from '@tanstack/react-query';
import { getMe } from './auth.loaders';

export const authQueries = {
  all: () => ['auth'],

  one: () => [...authQueries.all(), 'one'],
  getOne: () =>
    queryOptions({
      queryKey: authQueries.one(),
      queryFn: getMe,
      initialData: {
        id: '0',
        phone: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        wantsPromotions: false,
      },
    }),
};
