import { QueryClient } from '@tanstack/react-query';
import { hydrateRoot } from 'react-dom/client';
import { enableMocks } from '../../mocks';
import { ClientApp } from './ClientApp';
import { createRootContainer } from './lib/utils/browser';

try {
  const root = document.getElementById('root') || createRootContainer();
  const queryClient = new QueryClient();

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
