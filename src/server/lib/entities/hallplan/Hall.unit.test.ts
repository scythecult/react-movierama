import { Hall } from './Hall';
import { SEAT_SIZE } from './Seat';

const seatPitch = SEAT_SIZE.WIDTH + SEAT_SIZE.OFFSET;
const aislePitch = seatPitch + SEAT_SIZE.WIDTH / 2;

describe('Hall', () => {
  test('should place a wider aisle on a gap and size the canvas from the seats', () => {
    const hall = new Hall({ hallPlanMatrix: [[1, 0, 1]] });
    const [first, second] = hall.createSeats();

    expect(first).toMatchObject({
      id: 1001,
      x: 0,
      y: 0,
      place: 1,
      row: 1,
      type: 1,
      w: SEAT_SIZE.WIDTH,
      h: SEAT_SIZE.HEIGHT,
    });
    expect(second).toMatchObject({
      id: 1003,
      x: seatPitch + aislePitch,
      y: 0,
      place: 3,
      row: 1,
      type: 1,
    });
    expect(hall.getCanvasSize()).toEqual({
      width: seatPitch + aislePitch + SEAT_SIZE.WIDTH,
      height: SEAT_SIZE.HEIGHT,
    });
  });

  test('should keep seat ids stable when the layout is built again', () => {
    const hall = new Hall({
      hallPlanMatrix: [
        [1, 0],
        [2, 2],
      ],
    });

    const firstPass = hall.createSeats().map((seat) => seat.id);
    const secondPass = hall.createSeats().map((seat) => seat.id);

    expect(secondPass).toEqual(firstPass);
    expect(new Set(secondPass).size).toBe(secondPass.length);
    expect(hall.createSeats()).toHaveLength(3);
  });
});
