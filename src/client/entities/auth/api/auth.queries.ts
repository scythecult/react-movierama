import { queryOptions } from '@tanstack/react-query';
import { STALE_INITIAL_DATA_UPDATED_AT } from '../../../shared/api/query-client';
import { getMe } from './auth.loaders';

export const authQueries = {
  all: () => ['auth'],

  one: () => [...authQueries.all(), 'one'],
  getOne: () =>
    queryOptions({
      queryKey: authQueries.one(),
      queryFn: getMe,
      initialData: {
        id: '',
        phone: '',
        firstName: '',
        lastName: '',
        email: '',
        isPromoChecked: false,
        isLegalChecked: false,
      },
      initialDataUpdatedAt: STALE_INITIAL_DATA_UPDATED_AT,
    }),
};
