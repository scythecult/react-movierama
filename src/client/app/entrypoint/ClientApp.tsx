import type { DehydratedState, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { AppProviders } from '../providers/AppProviders';
import { AppRouter } from '../routers/AppRouter';

type ClientAppProps = {
  queryClient: QueryClient;
  queryState?: DehydratedState;
  initialState?: Partial<CombinedAppStore>;
};

export const ClientApp = (props: ClientAppProps) => {
  const { queryClient, queryState, initialState } = props;

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={queryState}>
          <BrowserRouter>
            <AppProviders initialState={initialState}>
              <AppRouter />
            </AppProviders>
          </BrowserRouter>
        </HydrationBoundary>
      </QueryClientProvider>
    </StrictMode>
  );
};
