import type { Canvas, SeatData, SeatType } from '../../../../../common/types/hallplan';
import type { WithMiddlewareStateCreator } from '../../appStore';

type AppSliceState = {
  seats: SeatData[];
  canvas: Canvas;
  seatTypes: SeatType[];
};

export type AppSlice = AppSliceState;

export const createAppSlice: WithMiddlewareStateCreator<AppSlice> = (set) => ({
  seats: [],
  canvas: { width: 0, height: 0 },
  seatTypes: [],

  setCanvas: (canvas: Canvas) => set(() => ({ canvas })),
  setSeats: (seats: SeatData[]) => set(() => ({ seats })),
  setSeatTypes: (seatTypes: SeatType[]) => set(() => ({ seatTypes })),
});
