import { useContext } from 'react';
import { useStore } from 'zustand';
import { AppStoreContext } from './AppStoreContext';

// TODO Rename generic name
export const useAppStore = <T,>(selector: (state: CombinedAppStore) => T): T => {
  const store = useContext(AppStoreContext);

  if (!store) {
    throw new Error('[useAppStore] must be used within [AppStoreProvider]');
  }

  return useStore(store, selector);
};
