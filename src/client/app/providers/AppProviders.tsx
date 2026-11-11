import type { PropsWithChildren } from 'react';
import { ModalProvider } from '../../shared/lib/modal';
import { AppStoreProvider } from '../../shared/lib/store';
import { AppStore } from '../store/AppStore';

type ProvidersProps = PropsWithChildren<{
  initialState?: Partial<CombinedAppStore>;
  store?: BoundAppStore;
}>;

export const AppProviders = (props: ProvidersProps) => {
  const { children, initialState, store = AppStore } = props;

  return (
    <AppStoreProvider store={store} initialState={initialState}>
      <ModalProvider>{children}</ModalProvider>
    </AppStoreProvider>
  );
};
