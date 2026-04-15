import type { Canvas, SeatData, SeatType } from './types';

type HallplanSliceState = {
  seats: SeatData[];
  canvas: Canvas;
  seatTypes: SeatType[];
};

type HallplanSliceActions = {
  setCanvas: (canvas: Canvas) => void;
  setSeats: (seats: SeatData[]) => void;
  setSeatTypes: (seatTypes: SeatType[]) => void;
};

export type HallplanSlice = HallplanSliceState & HallplanSliceActions;

export const createHallplanSlice: WithMiddlewareStateCreator<HallplanSlice> = (set) => ({
  seats: [],
  canvas: { width: 0, height: 0 },
  seatTypes: [],

  setCanvas: (canvas: Canvas) => set(() => ({ canvas })),
  setSeats: (seats: SeatData[]) => set(() => ({ seats })),
  setSeatTypes: (seatTypes: SeatType[]) => set(() => ({ seatTypes })),
});
