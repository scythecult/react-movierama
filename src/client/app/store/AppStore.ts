import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createCartSlice } from '../../entities/cart/model';

// Please keep in mind you should only apply middlewares in the combined store.
export const AppStore = create<CombinedAppStore>()(
  // Middleware should be called here and takes (...store) as argument.
  devtools(
    immer((...store) => ({
      ...createCartSlice(...store),
    })),
    { name: 'AppStore' },
  ),
);
