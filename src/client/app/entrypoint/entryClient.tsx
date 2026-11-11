import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { enableMocks } from '../../../../mocks';
import { queryClient } from '../../shared/api/query-client';
import { createRootContainer } from '../../shared/lib/react';
import { appRoutes } from '../routers/appRoutes';
import { ClientApp } from './ClientApp';

try {
  const root = document.getElementById('root') || createRootContainer();

  enableMocks().then(() => {
    hydrateRoot(
      root,
      <ClientApp
        initialState={window.__appInitialState__}
        queryClient={queryClient}
        queryState={window.__pageQueryData__}
        router={createBrowserRouter(appRoutes)}
      />,
    );
  });
} catch (error) {
  console.error(error);
}
