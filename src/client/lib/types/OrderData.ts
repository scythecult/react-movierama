export type SeatTypeName = 'regular' | 'comfort' | 'vip';

export type TicketTypeName = 'child' | 'student' | 'adult';

export type SeatData = {
  id: string;
  isSelected: boolean;
  isOccupied: boolean;
  place: number;
  type: SeatTypeName;
  typeId: number;
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

export type SelectedSeat = SeatData & { price: number, ticketTypeId: number, seatType: SeatType };