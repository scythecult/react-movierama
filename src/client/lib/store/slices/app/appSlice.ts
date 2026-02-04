import type { GeolocationData } from '../../../../../common/types/geolocation';
import type { Canvas, SeatData, SeatType } from '../../../../../common/types/hallplan';
import type { LocationsData } from '../../../../../common/types/locations';
import type { WithMiddlewareStateCreator } from '../../appStore';

type AppSliceState = {
  location: GeolocationData;
  locations: LocationsData[];
  seats: SeatData[];
  canvas: Canvas;
  seatTypes: SeatType[];
};

type AppSliceActions = {
  setLocation: (location: GeolocationData) => void;
  setCanvas: (canvas: Canvas) => void;
  setSeats: (seats: SeatData[]) => void;
  setSeatTypes: (seatTypes: SeatType[]) => void;
};

export type AppSlice = AppSliceState & AppSliceActions;

export const createAppSlice: WithMiddlewareStateCreator<AppSlice> = (set) => ({
  location: {
    name: '',
    id: -1,
  },
  locations: [],
  seats: [],
  canvas: { width: 0, height: 0 },
  seatTypes: [],

  setLocation: (location: GeolocationData) => set(() => ({ location })),
  setCanvas: (canvas: Canvas) => set(() => ({ canvas })),
  setSeats: (seats: SeatData[]) => set(() => ({ seats })),
  setSeatTypes: (seatTypes: SeatType[]) => set(() => ({ seatTypes })),
});
