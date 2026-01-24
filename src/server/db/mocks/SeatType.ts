import type { SeatType } from '../../../common/types/hallplan';

export class MockSeatTypeDb {
  #seatTypes: SeatType[];
  constructor(seatTypes: SeatType[]) {
    this.#seatTypes = seatTypes;
  }

  async findMany() {
    return this.#seatTypes;
  }
}
