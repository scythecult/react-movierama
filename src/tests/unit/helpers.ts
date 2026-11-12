import { QueryClient } from '@tanstack/react-query';
import type { Response } from 'express';
import type { UserData } from '../../common/entities/auth';
import type { LocationData } from '../../common/entities/locations';
import type { SessionStore } from '../../server/lib/helpers/session';

export const TEST_MOSCOW_LOCATION: LocationData = { id: 1, name: 'Москва и МО' };

export const TEST_ASTRAKHAN_LOCATION: LocationData = { id: 23, name: 'Астрахань' };

export const TEST_EMPTY_LOCATION = {
  id: 0,
  name: '',
};

export const TEST_EMPTY_USER = {
  id: 0,
  phone: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  gender: '',
  wantsPromotions: false,
};

export const buildUser = (): UserData => ({
  id: 'user-1',
  phone: '123123123123',
  firstName: 'Alex',
  lastName: 'Ivanov',
  email: 'test@asd.asd',
  password: 'hashed-password',
  isLegalChecked: true,
  isPromoChecked: false,
});

export const captureError = async (action: () => Promise<unknown>) => {
  try {
    await action();
  } catch (error) {
    return error;
  }

  throw new Error('Expected the action to throw');
};

export const createMockResponse = (): Partial<Response> => ({
  status: vi.fn().mockReturnThis(),
  json: vi.fn().mockReturnThis(),
});

export const createSession = () => {
  const session = {
    regenerate: vi.fn().mockResolvedValue(undefined),
    setUser: vi.fn(),
    destroy: vi.fn().mockResolvedValue(undefined),
  };

  return session satisfies SessionStore;
};

export const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};
