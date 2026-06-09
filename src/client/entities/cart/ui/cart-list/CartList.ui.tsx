import type { JSX } from 'react';
import { useAppStore } from '../../../../shared/lib/store';
import type { TicketType } from '../../model';
import { CartItemUi } from './cart-item/CartItemUi';
import styles from './styles.module.css';

export type CartListUiProps = {
  renderRemoveFromCartButton: (itemId: number) => JSX.Element;
  renderTicketTypeSelect: (seatId: number, ticketTypeId: number, ticketTypes: TicketType[]) => JSX.Element;
};

export const CartListUi = (props: CartListUiProps) => {
  const { renderRemoveFromCartButton, renderTicketTypeSelect } = props;
  const cart = useAppStore((state) => state.cart);

  if (cart.length === 0) {
    return null;
  }

  const selectedSeatNodes = cart.map((cartItem) => {
    const {
      id,
      ticketTypeId,
      price,
      seatType: { ticketTypes },
    } = cartItem;

    return (
      <CartItemUi
        key={id}
        cartItem={cartItem}
        actions={
          <>
            {renderTicketTypeSelect(id, ticketTypeId, ticketTypes)}
            <span data-test-id="cart-price">{price} RUB</span>
            {renderRemoveFromCartButton(id)}
          </>
        }
      />
    );
  });

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
