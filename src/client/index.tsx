import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { enableMocks } from '../../mocks';
import { App } from './lib/components/app/App';
import { AppStoreProvider } from './lib/contexts/app-store/AppStoreProvider';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const queryClient = new QueryClient();

enableMocks().then(() => {
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppStoreProvider>
          <App />
        </AppStoreProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
