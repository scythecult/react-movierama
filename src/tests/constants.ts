import type { CartItem, TicketType } from '@/client/lib/types/OrderPageData';

export const TICKET_TYPES: TicketType[] = [
  {
    id: 1,
    name: 'student',
    price: 200,
  },
  {
    id: 2,
    name: 'adult',
    price: 250,
  },
];

export const CART_ITEMS: CartItem[] = [
  {
    id: 1,
    place: 1,
    type: 1,
    row: 1,
    seatType: { id: 1, name: 'vip', ticketTypes: TICKET_TYPES },
    price: 100,
    ticketTypeId: 1,
  },
];
