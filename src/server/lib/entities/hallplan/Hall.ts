import { Seat, SEAT_SIZE } from './Seat';

type HallOptions = {
  hallPlanMatrix: number[][];
  seatWidth?: number;
  seatHeight?: number;
  seatOffset?: number;
};

export class Hall {
  #hallPlanMatrix: number[][];
  #seatWidth: number;
  #seatHeight: number;
  #seatOffset: number;
  #canvasWidth = 0;
  #canvasHeight = 0;
  #seats: Seat[] = [];
  #isBuilt = false;

  constructor(options: HallOptions) {
    this.#hallPlanMatrix = options.hallPlanMatrix;
    this.#seatWidth = options.seatWidth ?? SEAT_SIZE.WIDTH;
    this.#seatHeight = options.seatHeight ?? SEAT_SIZE.HEIGHT;
    this.#seatOffset = options.seatOffset ?? SEAT_SIZE.OFFSET;
  }

  createSeats() {
    const seats: Seat[] = [];
    let canvasWidth = 0;
    let canvasHeight = 0;
    const seatPitch = this.#seatWidth + this.#seatOffset;
    const aislePitch = seatPitch + this.#seatWidth / 2;

    for (let rowIndex = 0; rowIndex < this.#hallPlanMatrix.length; rowIndex++) {
      const row = this.#hallPlanMatrix[rowIndex];
      let x = 0;

      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const type = row[columnIndex];

        if (!type) {
          x += aislePitch;
          continue;
        }

        const y = rowIndex * (this.#seatHeight + this.#seatOffset);
        const place = columnIndex + 1;
        const rowNumber = rowIndex + 1;

        seats.push(
          new Seat({
            id: rowNumber * 1000 + place,
            w: this.#seatWidth,
            h: this.#seatHeight,
            x,
            y,
            place,
            type,
            row: rowNumber,
          }),
        );

        canvasWidth = Math.max(canvasWidth, x + this.#seatWidth);
        canvasHeight = Math.max(canvasHeight, y + this.#seatHeight);
        x += seatPitch;
      }
    }

    this.#seats = seats;
    this.#canvasWidth = canvasWidth;
    this.#canvasHeight = canvasHeight;
    this.#isBuilt = true;

    return this.#seats;
  }

  getCanvasSize() {
    if (!this.#isBuilt) {
      this.createSeats();
    }

    return {
      width: this.#canvasWidth,
      height: this.#canvasHeight,
    };
  }
}
