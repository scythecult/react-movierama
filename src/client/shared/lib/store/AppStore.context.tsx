import { createContext } from 'react';
import { useContext } from 'react';
import { useStore } from 'zustand';

export const AppStoreContext = createContext<BoundAppStore | null>(null);

export const useAppStore = <ExpectedSliceProp,>(
  selector: (state: CombinedAppStore) => ExpectedSliceProp,
): ExpectedSliceProp => {
  const store = useContext(AppStoreContext);

  if (!store) {
    throw new Error('[useAppStore] must be used within [AppStoreProvider]');
  }

  return useStore(store, selector);
};
