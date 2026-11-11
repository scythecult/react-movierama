import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { AppStoreContext } from './AppStore.context';

type AppStoreProviderProps = PropsWithChildren<{ initialState?: Partial<CombinedAppStore>; store: BoundAppStore }>;

export const AppStoreProvider = (props: AppStoreProviderProps) => {
  const { store, children, initialState } = props;
  const [appStore] = useState<BoundAppStore>(() => {
    if (initialState) {
      store.setState(initialState);
    }

    return store;
  });

  return <AppStoreContext value={appStore}>{children}</AppStoreContext>;
};
