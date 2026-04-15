import { Button } from '../../../../shared/ui/button/Button';
import { useAppStore } from '../../../../shared/zustand/useAppStore';

export const ClearCartButton = () => {
  const totalPrice = useAppStore((state) => state.cartTotalPrice);
  const clearCart = useAppStore((state) => state.clearCart);
  const isClearCartButtonVisible = totalPrice !== 0;

  if (!isClearCartButtonVisible) {
    return null;
  }

  return (
    <Button onClick={clearCart} data-test-id="clear-cart-button">
      Clear cart
    </Button>
  );
};
