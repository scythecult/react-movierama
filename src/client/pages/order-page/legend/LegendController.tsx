import { useAppStore } from '../../../lib/contexts/app-store/useAppStore';
import { Legend } from './Legend';

export const LegendController = () => {
  const seatTypes = useAppStore((state) => state.seatTypes);

  return <Legend seatTypes={seatTypes} />;
};
