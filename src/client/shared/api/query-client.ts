import { QueryClient } from '@tanstack/react-query';
import { getRequestContext } from './request-context';

// Hydrated queries stay fresh through the first client render, so the markup matches SSR.
const HYDRATION_STALE_TIME = 60 * 1000;

// Placeholder `initialData` must not look like a completed fetch and block the real request.
export const STALE_INITIAL_DATA_UPDATED_AT = 0;

type CreateQueryClientOptions = {
  retry?: boolean | number;
};

export const createQueryClient = (options: CreateQueryClientOptions = {}) =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: HYDRATION_STALE_TIME,
        retry: options.retry ?? 3,
      },
    },
  });

export const queryClient = createQueryClient();

// SSR loaders must use the client stored for this request. The browser has one shared client.
export const getRouteQueryClient = () => getRequestContext()?.queryClient ?? queryClient;
