import { useAppStore } from '@/client/lib/contexts/app-store/useAppStore';
import { Seats } from './Seats';

export const SeatsController = () => {
  const seats = useAppStore((state) => state.seats);
  const { width, height } = useAppStore((state) => state.canvas);
  const setIsSelected = useAppStore((state) => state.setIsSelected);
  const updateCart = useAppStore((state) => state.updateCart);
  const calculateTotalPrice = useAppStore((state) => state.updateCartTotalPrice);

  const handleSeatClick = (id: number) => {
    setIsSelected(id);
    updateCart();
    calculateTotalPrice();
  };

  return <Seats seats={seats} canvasWidth={width} canvasHeight={height} onClick={handleSeatClick} />;
};
