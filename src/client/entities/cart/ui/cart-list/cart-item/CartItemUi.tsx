import type { JSX } from 'react';
import type { SeatData } from '../../../../hallplan/model';
import { SEAT_TYPE } from '../../../../hallplan/ui/seats/const';
import styles from './styles.module.css';

export type CartItemUiProps = {
  cartItem: SeatData;
  actions?: JSX.Element;
};

export const CartItemUi = (props: CartItemUiProps) => {
  const { cartItem, actions } = props;
  const { place, row, type } = cartItem;
  const seatTypeName = SEAT_TYPE[type];

  return (
    <li className={styles.cartItem} data-test-id="cart-item">
      <p data-test-id="cart-item-place">
        {row} row, {place} place
      </p>

      <p data-test-id="cart-item-seat-type">{seatTypeName}</p>

      <div className={styles.cartItemControls} data-test-id="cart-item-controls">
        {actions}
      </div>
    </li>
  );
};
