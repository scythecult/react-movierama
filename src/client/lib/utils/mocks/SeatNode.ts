import { SEAT_HEIGHT, SEAT_WIDTH } from '@/client/lib/utils/mocks/constants';

export class SeatNode {
  id: number;
  w: number;
  h: number;
  x: number;
  y: number;
  place: number;
  // Seat type
  // 1 - regular, 2 - comfort, 3 - vip, 4 - wheelchair
  type: number;
  // Seat state
  // 1 - free, 2 - occupied
  state: number;
  row: number;

  constructor({ id = 0, w = SEAT_WIDTH, h = SEAT_HEIGHT, x = 0, y = 0, place = 0, type = 1, state = 1, row = 0 } = {}) {
    this.id = id;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.place = place;
    this.type = type;
    this.state = state;
    this.row = row;
  }
}
