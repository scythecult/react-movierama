import { create, type StateCreator, type StoreApi, type UseBoundStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { type AppSlice, createAppSlice } from './slices/app/appSlice';
import { createOrderSlice, type OrderSlice } from './slices/order/orderSlice';
import { createUserSlice, type UserSlice } from './slices/user/userSlice';

export type AppStore = AppSlice & OrderSlice & UserSlice;

export type UseAppStore = UseBoundStore<StoreApi<AppStore>>;

export type WithMiddlewareStateCreator<SliceType> = StateCreator<
  AppStore,
  [['zustand/immer', never], ['zustand/devtools', never]],
  [],
  SliceType
>;

// Please keep in mind you should only apply middlewares in the combined store.
export const getAppStore = create<AppStore>()(
  // Middleware should be called here and takes (...store) as argument.
  devtools(
    immer((...store) => ({
      ...createAppSlice(...store),
      ...createOrderSlice(...store),
      ...createUserSlice(...store),
    })),
    { name: 'AppStore' },
  ),
);
