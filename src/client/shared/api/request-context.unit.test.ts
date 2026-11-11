import { AsyncLocalStorage } from 'node:async_hooks';
import type { SsrRequestContext } from './request-context';
import { getRequestContext, runWithRequestContext, setRequestContextStorage, toSsrRequestContext } from './request-context';

describe('request context', () => {
  afterEach(() => {
    setRequestContextStorage(undefined);
  });

  test('should keep concurrent SSR requests on their own cookies', async () => {
    setRequestContextStorage(new AsyncLocalStorage<SsrRequestContext>());

    const cookies = await Promise.all([
      runWithRequestContext({ cookie: 'connect.sid=a' }, async () => {
        await Promise.resolve();

        return getRequestContext()?.cookie;
      }),
      runWithRequestContext({ cookie: 'connect.sid=b' }, async () => {
        await Promise.resolve();

        return getRequestContext()?.cookie;
      }),
    ]);

    expect(cookies).toEqual(['connect.sid=a', 'connect.sid=b']);
    expect(getRequestContext()).toBeUndefined();
  });

  test('should copy the viewer headers and fall back to the socket ip', () => {
    expect(
      toSsrRequestContext({
        ip: '198.51.100.10',
        headers: {
          cookie: 'connect.sid=abc',
          'user-agent': 'TestAgent',
          'accept-language': ['ru', 'en'],
        },
      }),
    ).toEqual({
      cookie: 'connect.sid=abc',
      forwardedFor: '198.51.100.10',
      userAgent: 'TestAgent',
      acceptLanguage: 'ru, en',
    });
  });

  test('should prefer an incoming forwarded-for chain', () => {
    expect(
      toSsrRequestContext({
        ip: '127.0.0.1',
        headers: {
          'x-forwarded-for': '203.0.113.5, 198.51.100.1',
        },
      }).forwardedFor,
    ).toBe('203.0.113.5, 198.51.100.1');
  });
});
