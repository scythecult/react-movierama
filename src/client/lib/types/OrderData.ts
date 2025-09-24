export type SeatData = {
  id: string;
  isSelected: boolean;
  isOccupied: boolean;
  place: number;
};

export type SeatTypeName = 'Regular' | 'Comfort' | 'Premium';

export type TicketTypeName = 'Child' | 'Student' | 'Adult';

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
