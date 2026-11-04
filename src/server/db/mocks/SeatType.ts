import type { SeatType } from '../../../common/entities/hallplan';

export class MockSeatTypeDb {
  #seatTypes: SeatType[];
  constructor(seatTypes: SeatType[]) {
    this.#seatTypes = seatTypes;
  }

  async findMany() {
    return this.#seatTypes;
  }
}
