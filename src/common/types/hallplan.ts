export type Canvas = {
  width: number;
  height: number;
};

export type SeatTypeName = 'regular' | 'comfort' | 'vip' | 'wheelchair';

export type TicketTypeName = 'child' | 'student' | 'adult';

export type TicketType = {
  id: number;
  name: TicketTypeName;
  price: number;
};

export type SeatType = {
  id: number;
  name: SeatTypeName;
  ticketTypes: TicketType[];
};

export type SeatData = {
  id: number;
  w: number;
  h: number;
  x: number;
  y: number;
  place: number;
  type: number;
  state: number;
  row: number;
  seatType: SeatType | undefined;
  price: number | null;
  ticketTypeId: number | null;
};

export type HallplanResponse = {
  canvas: Canvas;
  seats: SeatData[];
  seatTypes: SeatType[];
};
