import type { Request, Response } from 'express';
import { ExpressSessionStore } from './session';

const PERSISTENT_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

describe('ExpressSessionStore', () => {
  let session: {
    userId: string;
    isPersistent: boolean;
    cookie: { maxAge?: number };
    regenerate: ReturnType<typeof vi.fn>;
    destroy: ReturnType<typeof vi.fn>;
  };
  let response: { clearCookie: ReturnType<typeof vi.fn> };
  let store: ExpressSessionStore;

  beforeEach(() => {
    session = {
      userId: '',
      isPersistent: false,
      cookie: {},
      regenerate: vi.fn((callback: (error?: Error) => void) => {
        callback();
      }),
      destroy: vi.fn((callback: (error?: Error) => void) => {
        callback();
      }),
    };

    response = {
      clearCookie: vi.fn(),
    };

    store = new ExpressSessionStore({ session } as unknown as Request, response as unknown as Response);
  });

  test('should resolve regenerate when the session callback succeeds', async () => {
    await expect(store.regenerate()).resolves.toBeUndefined();

    expect(session.regenerate).toHaveBeenCalledTimes(1);
  });

  test('should reject regenerate when the session callback fails', async () => {
    const error = new Error('regenerate failed');
    session.regenerate.mockImplementation((callback: (error?: Error) => void) => {
      callback(error);
    });

    await expect(store.regenerate()).rejects.toBe(error);
  });

  test('should store the user id and a persistent cookie max age', () => {
    store.setUser('user-1', true);

    expect(session.userId).toBe('user-1');
    expect(session.isPersistent).toBe(true);
    expect(session.cookie.maxAge).toBe(PERSISTENT_MAX_AGE);
  });

  test('should store the user id without a persistent cookie', () => {
    store.setUser('user-1');

    expect(session.userId).toBe('user-1');
    expect(session.isPersistent).toBe(false);
    expect(session.cookie.maxAge).toBeUndefined();
  });

  test('should destroy the session and clear the session cookie', async () => {
    await expect(store.destroy()).resolves.toBeUndefined();

    expect(session.destroy).toHaveBeenCalledTimes(1);
    expect(response.clearCookie).toHaveBeenCalledWith('connect.sid', { path: '/', httpOnly: true });
  });

  test('should reject destroy without clearing the cookie when the session callback fails', async () => {
    const error = new Error('destroy failed');
    session.destroy.mockImplementation((callback: (error?: Error) => void) => {
      callback(error);
    });

    await expect(store.destroy()).rejects.toBe(error);
    expect(response.clearCookie).not.toHaveBeenCalled();
  });
});
