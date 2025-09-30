import { useAppStore } from '@/client/lib/hooks/useAppStore';
import type { SelectedSeat } from '@/client/lib/types/OrderData';
import { PreCheck } from '@/client/pages/order/pre-check/PreCheck';

export const PreCheckController = () => {
  const selectedSeats = useAppStore((state) => state.selectedSeats);
  const updateSelectedSeatPrice = useAppStore((state) => state.updateSelectedSeatPrice);
  const calculateTotalPrice = useAppStore((state) => state.calculateTotalPrice);
  const setIsSelected = useAppStore((state) => state.setIsSelected);
  const updateSelectedSeats = useAppStore((state) => state.updateSelectedSeats);

  const handleTicketTypeChange = (payload: SelectedSeat) => {
    updateSelectedSeatPrice(payload);
    calculateTotalPrice();
  };

  const handleRemoveSeat = (payload: SelectedSeat) => {
    setIsSelected(payload);
    updateSelectedSeats(payload);
    calculateTotalPrice();
  };

  return <PreCheck selectedSeats={selectedSeats} onTicketTypeChange={handleTicketTypeChange}
                   onRemoveSeatClick={handleRemoveSeat} />;
};