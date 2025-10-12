export type SeatTypeName = 'regular' | 'comfort' | 'vip' | 'wheelchair';

export type TicketTypeName = 'child' | 'student' | 'adult';

export type Canvas = {
  width: number;
  height: number;
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
  seatType: SeatType;
  price: number;
  ticketTypeId: number;
};

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

export type CartItem = {
  id: number;
  place: number;
  row: number;
  type: number;
  seatType: SeatType;
  price: number;
  ticketTypeId: number;
};

export type CartItemUpdatePayload = {
  id?: number;
  ticketTypeId?: number;
};
