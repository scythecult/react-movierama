import { Button } from '@/client/lib/components/button/Button';
import { Layout } from '@/client/lib/components/layout/Layout';
import { Hall } from './hall/Hall';
import { LegendController } from './legend/LegendController';
import { PreCheckController } from './pre-check/PreCheckController';
import { SeatsController } from './seats/SeatsController';
import styles from './styles.module.css';

export type OrderPageProps = {
  totalPrice: number;
};
export const OrderPage = (props: OrderPageProps) => {
  const { totalPrice } = props;
  const isPaymentButtonDisabled = totalPrice === 0;
  const paymentButtonText = isPaymentButtonDisabled ? 'Select seats' : `Proceed to payment: ${totalPrice} RUB`;

  return (
    // TODO Use common "page" component
    <main className={styles.order} data-test-id="order-page">
      <Layout className={styles.orderLayout}>
        <Hall>
          <SeatsController />
        </Hall>
        <LegendController />
        <PreCheckController />
        <div className={styles.orderFooter} data-test-id="order-footer">
          <Button disabled={isPaymentButtonDisabled} data-test-id="payment-button">
            {paymentButtonText}
          </Button>
        </div>
      </Layout>
    </main>
  );
};
