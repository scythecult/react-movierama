import { useAppStore } from '@/client/lib/hooks/useAppStore';
import { OrderPage } from '@/client/pages/order/OrderPage';

// Controller get all related data from store and passes it to child components
export const OrderPageController = () => {
  const totalPrice = useAppStore((state) => state.totalPrice);

  return <OrderPage totalPrice={totalPrice} />;
};
