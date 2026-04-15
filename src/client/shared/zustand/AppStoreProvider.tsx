import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { AppStoreContext } from './AppStoreContext';

type AppStoreProviderProps = PropsWithChildren<{ initialState?: Partial<CombinedAppStore>; store: BoundAppStore }>;

export const AppStoreProvider = (props: AppStoreProviderProps) => {
  const { store, children, initialState } = props;
  const [appStore] = useState<BoundAppStore>(() => store);

  if (initialState) {
    appStore.setState(initialState);
  }

  return <AppStoreContext value={appStore}>{children}</AppStoreContext>;
};
