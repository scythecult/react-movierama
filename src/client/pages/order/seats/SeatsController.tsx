import { useAppStore } from '@/client/lib/hooks/useAppStore';
import type { SeatData } from '@/client/lib/types/OrderData';
import { Seats } from '@/client/pages/order/seats/Seats';

export const SeatsController = () => {
  const seats = useAppStore((state) => state.seats);
  const setIsSelected = useAppStore((state) => state.setIsSelected);
  const updateSelectedSeats = useAppStore((state) => state.updateSelectedSeats);
  const calculateTotalPrice = useAppStore((state) => state.calculateTotalPrice);

  const handleSeatClick = (payload: SeatData) => {
    setIsSelected(payload);
    updateSelectedSeats(payload);
    calculateTotalPrice();
  };

  return <Seats seats={seats} onClick={handleSeatClick} />;
};