import { useContext } from 'react';
import { useStore } from 'zustand';
import { AppStoreContext } from '../contexts/AppStoreContext';
import type { AppStore } from '../store/appStore';

// TODO Rename generic name
export const useAppStore = <T,>(selector: (state: AppStore) => T): T => {
  const store = useContext(AppStoreContext);

  if (!store) {
    throw new Error('[useAppStore] must be used within [AppStoreProvider]');
  }

  return useStore(store, selector);
};
