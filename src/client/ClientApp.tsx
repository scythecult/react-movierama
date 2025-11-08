import type { DehydratedState, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { AppStoreProvider } from './lib/contexts/app-store/AppStoreProvider';
import type { AppStore } from './lib/store/appStore';
import { Routing } from './Routing';

type ClientAppProps = {
  queryClient: QueryClient;
  queryState?: DehydratedState;
  initialState?: Partial<AppStore>;
};

export const ClientApp = (props: ClientAppProps) => {
  const { queryClient, queryState, initialState } = props;

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={queryState}>
          <AppStoreProvider initialState={initialState}>
            <BrowserRouter>
              <Routing />
            </BrowserRouter>
          </AppStoreProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </StrictMode>
  );
};
