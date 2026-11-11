import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { StaticRouterProvider, type StaticRouterProviderProps } from 'react-router';
import { AppProviders } from '../providers/AppProviders';

type ServerAppProps = {
  queryClient: QueryClient;
  store: BoundAppStore;
  router: StaticRouterProviderProps['router'];
  context: StaticRouterProviderProps['context'];
};

export const ServerApp = (props: ServerAppProps) => {
  const { queryClient, store, router, context } = props;

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppProviders store={store}>
          {/* Loader state is serialized in the document head, beside the query cache. */}
          <StaticRouterProvider context={context} hydrate={false} router={router} />
        </AppProviders>
      </QueryClientProvider>
    </StrictMode>
  );
};
