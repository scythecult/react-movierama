import { Button } from '../../../../shared/ui/button/Button';
import { useAppStore } from '../../../../shared/zustand/useAppStore';

type RemoveFromCartButtonProps = {
  seatId: number;
};

export const RemoveFromCartButton = (props: RemoveFromCartButtonProps) => {
  const { seatId } = props;
  const removeFromCart = useAppStore((state) => state.removeFromCart);

  const handleRemoveClick = () => {
    removeFromCart(seatId);
  };

  return (
    <Button onClick={handleRemoveClick} data-test-id="cart-remove-button">
      Remove
    </Button>
  );
};
