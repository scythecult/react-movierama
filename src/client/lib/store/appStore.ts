import { create, type StoreApi, type UseBoundStore } from 'zustand';
import { createOrderSlice, type OrderSlice } from './slices/seatsSlice';
import { createUserSlice, type UserSlice } from './slices/userSlice';

export type AppStore = OrderSlice & UserSlice;

export type CreateAppStore = UseBoundStore<StoreApi<AppStore>>;

// Please keep in mind you should only apply middlewares in the combined store.
export const createAppStore = create<AppStore>()(
  // Middleware should be called here and takes (...store) as argument.
  (...store) => ({
    ...createOrderSlice(...store),
    ...createUserSlice(...store),
  }),
);

createAppStore.getState();
