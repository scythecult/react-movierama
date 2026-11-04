import type { SeatType } from '../../../../common/entities/hallplan';

export type SeatTypeRepository = {
  getAll: () => Promise<SeatType[]>;
};
