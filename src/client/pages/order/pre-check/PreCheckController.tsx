import { useAppStore } from '@/client/lib/hooks/useAppStore';
import type { CartItem } from '@/client/lib/types/OrderPageData';
import { PreCheck } from '@/client/pages/order/pre-check/PreCheck';

export const PreCheckController = () => {
  const cart = useAppStore((state) => state.cart);
  const updateCart = useAppStore((state) => state.updateCart);
  const updateCartTicketType = useAppStore((state) => state.updateCartTicketType);
  const updateCartTotalPrice = useAppStore((state) => state.updateCartTotalPrice);
  const setIsSelected = useAppStore((state) => state.setIsSelected);

  const handleTicketTypeChange = (payload: CartItem) => {
    updateCartTicketType(payload);
    updateCartTotalPrice();
  };

  const handleRemoveSeat = (id: number) => {
    setIsSelected(id);
    updateCart();
    updateCartTotalPrice();
  };

  return <PreCheck cart={cart} onTicketTypeChange={handleTicketTypeChange} onRemoveSeatClick={handleRemoveSeat} />;
};
