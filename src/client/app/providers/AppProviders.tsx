import type { PropsWithChildren } from 'react';
import { ModalProvider } from '../../shared/lib/modal';
import { AppStoreProvider } from '../../shared/lib/store';
import { AppStore } from '../store/AppStore';

type ProvidersProps = PropsWithChildren<{ initialState?: Partial<CombinedAppStore> }>;

export const AppProviders = (props: ProvidersProps) => {
  const { children, initialState } = props;

  return (
    <AppStoreProvider store={AppStore} initialState={initialState}>
      <ModalProvider>{children}</ModalProvider>
    </AppStoreProvider>
  );
};
