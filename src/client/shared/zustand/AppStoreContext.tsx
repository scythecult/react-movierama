import { createContext } from 'react';

export const AppStoreContext = createContext<BoundAppStore | null>(null);
