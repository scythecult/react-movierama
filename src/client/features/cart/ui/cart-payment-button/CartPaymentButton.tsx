import { AppPath } from '../../../../../common/constants/routes';
import { LinkButton } from '../../../../shared/ui/button/LinkButton';
import { useAppStore } from '../../../../shared/zustand/useAppStore';

export const CartPaymentButton = () => {
  const totalPrice = useAppStore((state) => state.cartTotalPrice);
  const isDisabled = totalPrice === 0;
  const textFinal = isDisabled ? 'Select seats' : `Proceed to payment: ${totalPrice} RUB`;

  return (
    <LinkButton
      isDisabled={isDisabled}
      to={AppPath.CHECKOUT}
      data-test-id="cart-payment-button"
      data-test-disabled={isDisabled}
    >
      {textFinal}
    </LinkButton>
  );
};
