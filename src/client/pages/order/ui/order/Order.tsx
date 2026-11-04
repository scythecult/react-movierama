import { useQuery } from '@tanstack/react-query';
import { CartListUi } from '../../../../entities/cart/ui';
import { hallplanQueries } from '../../../../entities/hallplan/api';
import { Hall, Legend, Seats } from '../../../../entities/hallplan/ui';
import { AddToCartButton, CartPaymentButton, ClearCartButton, TicketTypeSelect } from '../../../../features/cart/ui';
import { RemoveFromCartButton } from '../../../../features/cart/ui';
import { useLocationCheck } from '../../../../features/locations/model/locations.hooks';
import { useAppStore } from '../../../../shared/lib/store';
import styles from './styles.module.css';

export const Order = () => {
  const cart = useAppStore((state) => state.cart);
  const { location, isResolving } = useLocationCheck();
  const locationId = location && location.id > 0 ? location.id : undefined;
  const { data, isLoading, isError } = useQuery(hallplanQueries.getOne(locationId));

  if (isResolving || isLoading) {
    // TODO Add skeletons
    return <div>Loading...</div>;
  }

  if (!locationId) {
    return <div>Choose a location to see the hall plan</div>;
  }

  if (isError || !data) {
    return <div>Hall plan is unavailable</div>;
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
          renderAddToCartButton={(seatId) => <AddToCartButton seats={seats} seatId={seatId} />}
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
