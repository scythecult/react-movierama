import { useAppStore } from '@/client/lib/contexts/app-store/useAppStore';
import { PreCheck } from './PreCheck';

export const PreCheckController = () => {
  const cart = useAppStore((state) => state.cart);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const updateCartTicketType = useAppStore((state) => state.updateCartTicketType);

  const handleTicketTypeChange = (seatId: number, ticketTypeId: number) => {
    updateCartTicketType(seatId, ticketTypeId);
  };

  const handleRemoveSeat = (seatId: number) => {
    removeFromCart(seatId);
  };

  return <PreCheck cart={cart} onTicketTypeChange={handleTicketTypeChange} onRemoveSeatClick={handleRemoveSeat} />;
};
