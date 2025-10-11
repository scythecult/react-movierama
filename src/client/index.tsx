import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './lib/components/app/App';
import { AppStoreProvider } from './lib/contexts/app-store/AppStoreProvider';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <AppStoreProvider>
      <App />
    </AppStoreProvider>
  </React.StrictMode>,
);
