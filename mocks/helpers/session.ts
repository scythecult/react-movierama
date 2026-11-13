import type { UserData } from '../../src/common/entities/auth';
import type { PublicUser } from '../state/store';
import { mockApiStore } from '../state/store';
import { clearCookie, PERSISTENT_MAX_AGE, readCookie, serializeCookie, SESSION_MAX_AGE, withCookies } from './cookies';

const SESSION_COOKIE = 'seats.sid';

type SessionPayload = {
  userId: string;
  user: PublicUser;
};

const isSessionPayload = (value: unknown): value is SessionPayload => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const payload = value as SessionPayload;

  return typeof payload.userId === 'string' && payload.userId.length > 0 && Boolean(payload.user);
};

// The browser worker and the Node server do not share memory. The cookie is the
// session express-session would keep, including a public user snapshot so SSR
// can answer /auth/me after a sign-in that happened in the browser.
export const readSession = (request: Request) => {
  const raw = readCookie(request, SESSION_COOKIE);

  if (!raw) {
    return;
  }

  try {
    const payload: unknown = JSON.parse(raw);

    return isSessionPayload(payload) ? payload : undefined;
  } catch {
    return;
  }
};

export const sessionCookie = (user: UserData, isPersistent = false) =>
  serializeCookie(
    SESSION_COOKIE,
    JSON.stringify({
      userId: user.id,
      user: mockApiStore.toPublicUser(user),
    }),
    isPersistent ? PERSISTENT_MAX_AGE : SESSION_MAX_AGE,
  );

export const clearSessionCookie = () => clearCookie(SESSION_COOKIE);

export const withSession = (response: Response, user: UserData, isPersistent = false) =>
  withCookies(response, [sessionCookie(user, isPersistent)]);

export const currentUser = (request: Request) => {
  const session = readSession(request);

  if (!session) {
    return null;
  }

  const user = mockApiStore.findUserById(session.userId);

  return user ? mockApiStore.toPublicUser(user) : session.user;
};
