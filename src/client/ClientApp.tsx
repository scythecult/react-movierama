import type { DehydratedState, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { AppStoreProvider } from './lib/contexts/app-store/AppStoreProvider';
import type { AppStore } from './lib/store/appStore';
import { OrderPage } from './pages/order-page/OrderPage';

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
            <OrderPage />
          </AppStoreProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </StrictMode>
  );
};
