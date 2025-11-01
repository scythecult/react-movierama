import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { AppStoreProvider } from './lib/contexts/app-store/AppStoreProvider';
import { OrderPage } from './pages/order-page/OrderPage';

type AppProps = {
  queryClient: QueryClient;
};

export const App = (props: AppProps) => {
  const { queryClient } = props;

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppStoreProvider>
          <OrderPage />
        </AppStoreProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};
