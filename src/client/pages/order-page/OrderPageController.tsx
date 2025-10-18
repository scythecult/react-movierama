import { useAppStore } from '../../lib/contexts/app-store/useAppStore';
import { OrderPage } from './OrderPage';

// Controller get all related data from store and passes it to child components
export const OrderPageController = () => {
  const totalPrice = useAppStore((state) => state.cartTotalPrice);
  const clearCart = useAppStore((state) => state.clearCart);

  const handleClearCartClick = () => clearCart();

  return <OrderPage totalPrice={totalPrice} onClearCart={handleClearCartClick} />;
};
