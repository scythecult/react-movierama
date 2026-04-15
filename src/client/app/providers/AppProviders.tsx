import type { PropsWithChildren } from 'react';
import { AppStoreProvider } from '../../shared/zustand/AppStoreProvider';
import { Modals } from '../../widgets/modals';
import { AppStore } from '../store/AppStore';

type ProvidersProps = PropsWithChildren<{ initialState?: Partial<CombinedAppStore> }>;

export const AppProviders = (props: ProvidersProps) => {
  const { children, initialState } = props;

  return (
    <AppStoreProvider store={AppStore} initialState={initialState}>
      <Modals>{children}</Modals>
    </AppStoreProvider>
  );
};
