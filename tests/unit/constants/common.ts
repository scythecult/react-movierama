import type { CartItem } from '@/client/lib/types/OrderPageData';

export const CART_ITEMS: CartItem[] = [
  {
    id: 1,
    place: 1,
    type: 1,
    row: 1,
    seatType: { id: 1, name: 'vip', ticketTypes: [] },
    price: 100,
    ticketTypeId: 1,
  },
];
