import type { SeatType } from '../../../client/entities/hallplan/model';

export class MockSeatTypeDb {
  #seatTypes: SeatType[];
  constructor(seatTypes: SeatType[]) {
    this.#seatTypes = seatTypes;
  }

  async findMany() {
    return this.#seatTypes;
  }
}
