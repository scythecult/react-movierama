import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { type CreateAppStore, createAppStore } from '../../store/appStore';
import { AppStoreContext } from './AppStoreContext';

export const AppStoreProvider = (props: PropsWithChildren) => {
  const [appStore] = useState<CreateAppStore | null>(() => createAppStore);
  const { children } = props;

  return <AppStoreContext value={appStore}>{children}</AppStoreContext>;
};
