import { useQuery } from '@tanstack/react-query';
import { CartListUi } from '../../../../entities/cart/ui';
import { hallplanQueries } from '../../../../entities/hallplan/api';
import { Hall, Legend, Seats } from '../../../../entities/hallplan/ui';
import { AddToCartButton, CartPaymentButton, ClearCartButton, TicketTypeSelect } from '../../../../features/cart/ui';
import { RemoveFromCartButton } from '../../../../features/cart/ui';
import { useAppStore } from '../../../../shared/lib/store';
import styles from './styles.module.css';

export const Order = () => {
  const cart = useAppStore((state) => state.cart);
  const { data, isLoading } = useQuery(hallplanQueries.getOne());

  if (isLoading) {
    // TODO Add skeletons
    return <div>Loading...</div>;
  }

  // TODO Add proper check or add fallback values to hook
  if (!data && typeof data !== 'object') {
    return <div>Error</div>;
  }

  const { seats, canvas, seatTypes } = data;

  return (
    <div className={styles.order} data-test-id="order-page">
      <Hall>
        <Seats
          seats={seats}
          cart={cart}
          canvasWidth={canvas.width}
          canvasHeight={canvas.height}
          renderAddToCartButton={(seatId) => <AddToCartButton seatId={seatId} />}
        />
      </Hall>

      <Legend seatTypes={seatTypes} />

      <CartListUi
        renderRemoveFromCartButton={(itemId) => <RemoveFromCartButton seatId={itemId} />}
        renderTicketTypeSelect={(seatId, ticketTypeId, ticketTypes) => (
          <TicketTypeSelect seatId={seatId} ticketTypeId={ticketTypeId} ticketTypes={ticketTypes} />
        )}
      />

      <div className={styles.orderFooter} data-test-id="order-footer">
        <CartPaymentButton />

        <ClearCartButton />
      </div>
    </div>
  );
};
