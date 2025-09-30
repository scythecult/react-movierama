import type { SeatData, SeatType, SelectedSeat } from '@/client/lib/types/OrderData';

export const SEAT_TYPES: SeatType[] = [{
  id: 1, name: 'vip', ticketTypes: [
    { price: 240, id: 1, name: 'child' },
  ],
}];

export const SELECTED_SEATS: SelectedSeat[] = [{
  id: '1',
  isSelected: true,
  isOccupied: false,
  place: 1,
  type: 'vip',
  typeId: 1,
  seatType: { id: 1, name: 'vip', ticketTypes: [] },
  price: 100,
  ticketTypeId: 1,
}];

export const SEATS: SeatData[][] = [
  [
    {
      id: '0',
      isSelected: false,
      isOccupied: false,
      place: 1,
      type: 'regular',
      typeId: 342,
    },
    {
      id: '1',
      isSelected: false,
      isOccupied: false,
      place: 2,
      type: 'comfort',
      typeId: 342,
    },
  ],
];