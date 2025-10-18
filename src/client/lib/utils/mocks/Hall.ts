import type { SeatNode } from './SeatNode';

type HallOptions = {
  Seat: typeof SeatNode;
  hallPlanMatrix: number[][];
  seatWidth: number;
  seatHeight: number;
  seatOffset: number;
};

export class Hall {
  #hallPlanMatrix: number[][];
  #seatWidth: number;
  #seatHeight: number;
  #seatOffset: number;
  #canvasWidth = 0;
  #canvasHeight = 0;
  #finalRowLength = 0;
  #Seat: typeof SeatNode;
  #hall: SeatNode[] = [];

  constructor(options: HallOptions) {
    this.#Seat = options.Seat;
    this.#hallPlanMatrix = options.hallPlanMatrix;
    this.#seatWidth = options.seatWidth;
    this.#seatHeight = options.seatHeight;
    this.#seatOffset = options.seatOffset;
  }

  createSeats() {
    for (let i = 0; i < this.#hallPlanMatrix.length; i++) {
      const currentRowLength = this.#hallPlanMatrix[i].length - 1;

      for (let j = 0; j < this.#hallPlanMatrix[i].length; j++) {
        const seatMatrixValue = this.#hallPlanMatrix[i][j];
        const isGap = !seatMatrixValue;

        if (this.#finalRowLength < currentRowLength) {
          this.#finalRowLength = currentRowLength;
        }

        this.#canvasWidth = this.#finalRowLength * (this.#seatWidth + this.#seatOffset) + this.#seatWidth;
        this.#canvasHeight = i * (this.#seatHeight + this.#seatOffset) + this.#seatHeight;

        if (!isGap) {
          const seatXOffset = isGap
            ? this.#seatWidth + this.#seatOffset + this.#seatWidth / 2
            : this.#seatWidth + this.#seatOffset;
          const x = j * seatXOffset;
          const y = i * (this.#seatHeight + this.#seatOffset);

          this.#hall.push(
            new this.#Seat({
              id: x + y,
              x,
              y,
              place: j + 1,
              type: seatMatrixValue,
              row: i + 1,
            }),
          );
        }
      }
    }

    return this.#hall;
  }

  getCanvasSize() {
    if (!this.#canvasWidth || !this.#canvasHeight) {
      this.createSeats();
    }

    return {
      width: this.#canvasWidth,
      height: this.#canvasHeight,
    };
  }
}
