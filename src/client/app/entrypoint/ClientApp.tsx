import type { DehydratedState, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import type { RouterProviderProps } from 'react-router/dom';
import { RouterProvider } from 'react-router/dom';
import { AppProviders } from '../providers/AppProviders';

type ClientAppProps = {
  queryClient: QueryClient;
  router: RouterProviderProps['router'];
  queryState?: DehydratedState;
  initialState?: Partial<CombinedAppStore>;
};

export const ClientApp = (props: ClientAppProps) => {
  const { queryClient, router, queryState, initialState } = props;

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={queryState}>
          <AppProviders initialState={initialState}>
            <RouterProvider router={router} />
          </AppProviders>
        </HydrationBoundary>
      </QueryClientProvider>
    </StrictMode>
  );
};
