// TODO Should move to server
export const SEAT_WIDTH = 40;

export const SEAT_HEIGHT = 34;

export const SEAT_OFFSET = 10;

export const HALL_PLAN_MATRIX =
  // HALL
  [
    // ROW 1 - seat 0 - empty space width === 1 seat
    [1, 1, 0, 1, 4, 4, 1, 0, 1, 1, 1, 1, 1],
    // ROW
    [2, 2, 0, 1, 1, 1, 1, 0, 1],
    // ROW
    [1, 1, 0, 2, 2, 2, 2, 0, 1],
    // ROW
    [1, 1, 0, 3, 3, 3, 3, 0, 1],
  ];
