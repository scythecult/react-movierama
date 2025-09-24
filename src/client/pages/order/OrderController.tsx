import { useAppStore } from '@/client/lib/hooks/useAppStore';
import { Order } from './Order';

// Controller get all related data from store and passes it to child components
export const OrderController = () => {
  const seats = useAppStore((state) => state.seats);
  const totalPrice = useAppStore((state) => state.totalPrice);
  const setIsSelected = useAppStore((state) => state.setIsSelected);

  const handleSeatClick = (seatId: string, isSelected: boolean) => {
    setIsSelected(seatId, isSelected);
  };

  return <Order totalPrice={totalPrice} seats={seats} onSeatClick={handleSeatClick} />;
};
