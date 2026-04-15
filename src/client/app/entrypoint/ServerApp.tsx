import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { StaticRouter } from 'react-router';
import { AppProviders } from '../providers/AppProviders';
import { AppRouter } from '../routers/AppRouter';

type ServerAppProps = {
  queryClient: QueryClient;
  url: string;
};

export const ServerApp = (props: ServerAppProps) => {
  const { queryClient, url } = props;

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url}>
          <AppProviders>
            <AppRouter />
          </AppProviders>
        </StaticRouter>
      </QueryClientProvider>
    </StrictMode>
  );
};
