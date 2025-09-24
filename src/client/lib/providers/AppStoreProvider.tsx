import type { PropsWithChildren } from 'react';
import { useRef } from 'react';
import { AppStoreContext } from '../contexts/AppStoreContext';
import { type CreateAppStore, createAppStore } from '../store/appStore';

export const AppStoreProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const appStoreRef = useRef<CreateAppStore | null>(null);

  if (!appStoreRef.current) {
    appStoreRef.current = createAppStore;
  }

  return <AppStoreContext.Provider value={appStoreRef.current}>{children}</AppStoreContext.Provider>;
};
