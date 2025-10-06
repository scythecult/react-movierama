import { useAppStore } from '@/client/lib/hooks/useAppStore';
import { Legend } from './Legend';

export const LegendController = () => {
  const seatTypes = useAppStore((state) => state.seatTypes);

  return <Legend seatTypes={seatTypes} />;
};
