import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createCartSlice } from '../../entities/cart/model';
import { createFilmsSlice } from '../../entities/films/model';
import { createHallplanSlice } from '../../entities/hallplan/model';
import { createLocationsSlice } from '../../entities/locations/model';
import { createNewsSlice } from '../../entities/news/model';
import { createUserSlice } from '../../entities/user/model';

// Please keep in mind you should only apply middlewares in the combined store.
export const AppStore = create<CombinedAppStore>()(
  // Middleware should be called here and takes (...store) as argument.
  devtools(
    immer((...store) => ({
      ...createUserSlice(...store),
      ...createLocationsSlice(...store),
      ...createFilmsSlice(...store),
      ...createNewsSlice(...store),
      ...createHallplanSlice(...store),
      ...createCartSlice(...store),
    })),
    { name: 'AppStore' },
  ),
);
