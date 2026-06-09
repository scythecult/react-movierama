import type { DehydratedState } from '@tanstack/react-query';
import type { StateCreator } from 'zustand';
import type { CartSlice } from '../../entities/cart/model';

declare global {
  interface Window {
    __pageQueryData__?: DehydratedState;
    __appInitialState__?: Partial<CombinedAppStore>;
  }

  type CombinedAppStore = CartSlice;

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
