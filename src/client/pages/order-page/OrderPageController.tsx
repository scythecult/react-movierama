import { useAppStore } from '@/client/lib/contexts/app-store/useAppStore';
import { OrderPage } from './OrderPage';

// Controller get all related data from store and passes it to child components
export const OrderPageController = () => {
  const totalPrice = useAppStore((state) => state.cartTotalPrice);

  return <OrderPage totalPrice={totalPrice} />;
};
