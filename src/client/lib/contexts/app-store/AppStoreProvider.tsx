import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { getAppStore, type UseAppStore } from '../../store/appStore';
import { AppStoreContext } from './AppStoreContext';

export const AppStoreProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [appStore] = useState<UseAppStore>(() => getAppStore);

  return <AppStoreContext value={appStore}>{children}</AppStoreContext>;
};
