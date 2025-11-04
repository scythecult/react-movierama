import { useHallplanQuery } from '../../lib/api/hallplan/hooks';
import { Button } from '../../lib/components/button/Button';
import { Layout } from '../../lib/components/layout/Layout';
import { useAppStore } from '../../lib/contexts/app-store/useAppStore';
import { Hall } from './hall/Hall';
import { Legend } from './legend/Legend';
import { PreCheck } from './pre-check/PreCheck';
import { Seats } from './seats/Seats';
import styles from './styles.module.css';

export const OrderPage = () => {
  const cart = useAppStore((state) => state.cart);
  const totalPrice = useAppStore((state) => state.cartTotalPrice);
  const addToCart = useAppStore((state) => state.addToCart);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const updateCartTicketType = useAppStore((state) => state.updateCartTicketType);
  const clearCart = useAppStore((state) => state.clearCart);
  const { data, isLoading } = useHallplanQuery();

  if (isLoading) {
    // TODO Add skeletons
    return <div>Loading...</div>;
  }

  // TODO Add proper check or add fallback values to hook
  if (!data && typeof data !== 'object') {
    return <div>Error</div>;
  }

  const { seats, canvas, seatTypes } = data;
  const isPaymentButtonDisabled = totalPrice === 0;
  const isClearCartButtonVisible = totalPrice !== 0;
  const paymentButtonText = isPaymentButtonDisabled ? 'Select seats' : `Proceed to payment: ${totalPrice} RUB`;

  const handleSeatClick = (seatId: number) => {
    addToCart(seats, seatId);
  };

  const handleTicketTypeChange = (seatId: number, ticketTypeId: number) => {
    updateCartTicketType(seatId, ticketTypeId);
  };

  const handleRemoveSeat = (seatId: number) => {
    removeFromCart(seatId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    // TODO Use common "page" component
    <main className={styles.order} data-test-id="order-page">
      <Layout className={styles.orderLayout}>
        <Hall>
          <Seats
            seats={seats}
            cart={cart}
            canvasWidth={canvas.width}
            canvasHeight={canvas.height}
            onClick={handleSeatClick}
          />
        </Hall>

        <Legend seatTypes={seatTypes} />

        <PreCheck cart={cart} onTicketTypeChange={handleTicketTypeChange} onRemoveSeatClick={handleRemoveSeat} />

        <div className={styles.orderFooter} data-test-id="order-footer">
          <Button disabled={isPaymentButtonDisabled} data-test-id="payment-button">
            {paymentButtonText}
          </Button>

          {isClearCartButtonVisible && (
            <Button onClick={handleClearCart} data-test-id="clear-cart-button">
              Clear cart
            </Button>
          )}
        </div>
      </Layout>
    </main>
  );
};
