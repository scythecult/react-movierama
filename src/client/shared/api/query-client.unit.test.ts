import { AsyncLocalStorage } from 'node:async_hooks';
import { createQueryClient, getRouteQueryClient, queryClient } from './query-client';
import type { SsrRequestContext } from './request-context';
import { runWithRequestContext, setRequestContextStorage } from './request-context';

describe('createQueryClient', () => {
  afterEach(() => {
    setRequestContextStorage(undefined);
  });

  test('should not share cache between clients', () => {
    const first = createQueryClient();
    const second = createQueryClient();

    first.setQueryData(['auth'], { id: 'user-a' });

    expect(second.getQueryData(['auth'])).toBeUndefined();
  });

  test('should keep hydrated data fresh and disable retries when asked', () => {
    const configuredClient = createQueryClient({ retry: false });
    const defaults = configuredClient.getDefaultOptions().queries;

    expect(defaults?.staleTime).toBe(60 * 1000);
    expect(defaults?.retry).toBe(false);
  });

  test('should read the query client bound to the current SSR request', () => {
    setRequestContextStorage(new AsyncLocalStorage<SsrRequestContext>());
    const requestClient = createQueryClient();

    const selected = runWithRequestContext({ queryClient: requestClient }, () => getRouteQueryClient());

    expect(selected).toBe(requestClient);
    expect(getRouteQueryClient()).toBe(queryClient);
  });
});
