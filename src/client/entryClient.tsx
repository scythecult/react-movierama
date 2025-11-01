import { QueryClient } from '@tanstack/react-query';
import { hydrateRoot } from 'react-dom/client';
import { enableMocks } from '../../mocks';
import { App } from './App';
import { createRootContainer } from './lib/utils/browser';

const root = document.getElementById('root') || createRootContainer();
const queryClient = new QueryClient();

enableMocks().then(() => {
  hydrateRoot(root, <App queryClient={queryClient} />);
});
