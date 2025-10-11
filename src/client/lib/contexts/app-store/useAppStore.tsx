import { useContext } from 'react';
import { useStore } from 'zustand';
import type { AppStore } from '../../store/appStore';
import { AppStoreContext } from './AppStoreContext';

// TODO Rename generic name
export const useAppStore = <T,>(selector: (state: AppStore) => T): T => {
  const store = useContext(AppStoreContext);

  if (!store) {
    throw new Error('[useAppStore] must be used within [AppStoreProvider]');
  }

  return useStore(store, selector);
};
