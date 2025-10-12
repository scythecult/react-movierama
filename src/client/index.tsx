import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './lib/components/app/App';
import { AppStoreProvider } from './lib/contexts/app-store/AppStoreProvider';
import { getAppStore } from './lib/store/appStore';
import { CANVAS_SIZE, SEATS_DATA } from './lib/utils/mocks';

const root = ReactDOM.createRoot(document.getElementById('root')!);

getAppStore.getState().setCanvas(CANVAS_SIZE);
getAppStore.getState().setSeats(SEATS_DATA);

root.render(
  <React.StrictMode>
    <AppStoreProvider>
      <App />
    </AppStoreProvider>
  </React.StrictMode>,
);
