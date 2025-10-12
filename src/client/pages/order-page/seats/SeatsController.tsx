import { useAppStore } from '@/client/lib/contexts/app-store/useAppStore';
import { Seats } from './Seats';

export const SeatsController = () => {
  const seats = useAppStore((state) => state.seats);
  const { width, height } = useAppStore((state) => state.canvas);
  const addToCart = useAppStore((state) => state.addToCart);

  const handleSeatClick = (seatId: number) => {
    addToCart(seatId);
  };

  return <Seats seats={seats} canvasWidth={width} canvasHeight={height} onClick={handleSeatClick} />;
};
