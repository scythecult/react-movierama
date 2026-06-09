import { hydrateRoot } from 'react-dom/client';
import { enableMocks } from '../../../../mocks';
import { queryClient } from '../../shared/api/query-client';
import { createRootContainer } from '../../shared/lib/react';
import { ClientApp } from './ClientApp';

try {
  const root = document.getElementById('root') || createRootContainer();

  enableMocks().then(() => {
    hydrateRoot(
      root,
      <ClientApp
        queryClient={queryClient}
        queryState={window.__pageQueryData__}
        initialState={window.__appInitialState__}
      />,
    );
  });
} catch (error) {
  console.error(error);
}
