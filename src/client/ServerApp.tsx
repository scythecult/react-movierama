import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { StaticRouter } from 'react-router';
import { AppStoreProvider } from './lib/contexts/app-store/AppStoreProvider';
import { Routing } from './Routing';

type ServerAppProps = {
  queryClient: QueryClient;
  url: string;
};

export const ServerApp = (props: ServerAppProps) => {
  const { queryClient, url } = props;

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppStoreProvider>
          <StaticRouter location={url}>
            <Routing />
          </StaticRouter>
        </AppStoreProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};
