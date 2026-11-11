import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createCartSlice } from '../../entities/cart/model';

// Please keep in mind you should only apply middlewares in the combined store.
export const createAppStore = () =>
  create<CombinedAppStore>()(
    devtools(
      immer((...store) => ({
        ...createCartSlice(...store),
      })),
      { name: 'AppStore' },
    ),
  );

export const AppStore = createAppStore();

export const toPersistedAppState = (state: CombinedAppStore) => ({
  cart: state.cart,
  cartTotalPrice: state.cartTotalPrice,
});
