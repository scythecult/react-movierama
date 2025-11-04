import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { type AppStore, getAppStore, type UseAppStore } from '../../store/appStore';
import { AppStoreContext } from './AppStoreContext';

type AppStoreProviderProps = PropsWithChildren<{ initialState?: Partial<AppStore> }>;

export const AppStoreProvider = (props: AppStoreProviderProps) => {
  const { children, initialState } = props;
  const [appStore] = useState<UseAppStore>(() => getAppStore);

  if (initialState) {
    appStore.setState(initialState);
  }

  return <AppStoreContext value={appStore}>{children}</AppStoreContext>;
};
