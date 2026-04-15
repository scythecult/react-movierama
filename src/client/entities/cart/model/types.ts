export type TicketType = {
  id: number;
  name: 'child' | 'student' | 'adult';
  price: number;
};

export type SeatType = {
  id: number;
  name: 'regular' | 'comfort' | 'vip' | 'wheelchair';
  ticketTypes: TicketType[];
};

export type CartItemData = {
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
