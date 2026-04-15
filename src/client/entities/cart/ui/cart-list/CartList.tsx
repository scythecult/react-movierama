import type { JSX } from 'react';
import { useAppStore } from '../../../../shared/zustand/useAppStore';
import type { TicketType } from '../../model';
import { CartItem } from './cart-item/CartItem';
import styles from './styles.module.css';

export type CartListProps = {
  renderRemoveFromCartButton: (itemId: number) => JSX.Element;
  renderTicketTypeSelect: (seatId: number, ticketTypeId: number, ticketTypes: TicketType[]) => JSX.Element;
};

export const CartList = (props: CartListProps) => {
  const { renderRemoveFromCartButton, renderTicketTypeSelect } = props;
  const cart = useAppStore((state) => state.cart);

  if (cart.length === 0) {
    return null;
  }

  const selectedSeatNodes = cart.map((cartItem) => (
    <CartItem
      key={cartItem.id}
      cartItem={cartItem}
      actions={
        <>
          {renderTicketTypeSelect(cartItem.id, cartItem.ticketTypeId, cartItem.seatType.ticketTypes)}
          <span data-test-id="cart-price">{cartItem.price} RUB</span>
          {renderRemoveFromCartButton(cartItem.id)}
        </>
      }
    />
  ));

  return (
    <section className={styles.cart} data-test-id="cart">
      <h2 className={styles.cartTitle} data-test-id="cart-title">
        Chosen places
      </h2>
      <ul className={styles.cartList} data-test-id="cart-list">
        {selectedSeatNodes}
      </ul>
    </section>
  );
};
