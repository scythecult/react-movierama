import type { SeatType } from '../../../../common/entities/hallplan';
import type { Seat } from './Seat';

export function mapSeatsToSeatData(seats: Seat[], seatTypes: SeatType[]) {
  const seatTypesMap = new Map(seatTypes.map((seatType) => [seatType.id, seatType]));

  return seats.map((seat) => {
    const seatType = seatTypesMap.get(seat.type);

    if (!seatType) {
      throw new Error(`Seat type ${seat.type} is not configured`);
    }

    const [defaultTicket] = seatType.ticketTypes;

    if (!defaultTicket) {
      throw new Error(`Seat type ${seatType.name} has no ticket types`);
    }

    return {
      id: seat.id,
      w: seat.w,
      h: seat.h,
      x: seat.x,
      y: seat.y,
      place: seat.place,
      type: seat.type,
      state: seat.state,
      row: seat.row,
      seatType,
      price: defaultTicket.price,
      ticketTypeId: defaultTicket.id,
    };
  });
}
