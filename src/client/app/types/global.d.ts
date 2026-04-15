import type { DehydratedState } from '@tanstack/react-query';
import type { StateCreator } from 'zustand';
import type { CartSlice } from '../../entities/cart/model';
import type { HallplanSlice } from '../../entities/hallplan/model';
import type { LocationsSlice } from '../../entities/locations/model';
import type { NewsSlice } from '../../entities/news/model';
import type { UserSlice } from '../../entities/user/model';

declare global {
  interface Window {
    __pageQueryData__?: DehydratedState;
    __appInitialState__?: Partial<CombinedAppStore>;
  }

  type CombinedAppStore = LocationsSlice & HallplanSlice & CartSlice & NewsSlice & UserSlice;

  type BoundAppStore = UseBoundStore<StoreApi<CombinedAppStore>>;

  type WithMiddlewareStateCreator<SliceType> = StateCreator<
    CombinedAppStore,
    [['zustand/immer', never], ['zustand/devtools', never]],
    [],
    SliceType
  >;

  type PropsWithClassName<Props = unknown> = Props & {
    className?: string | undefined;
  };
}
