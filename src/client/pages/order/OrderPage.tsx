// import { MoviePicker } from '../movie-picker/MoviePicker';
import { Button } from '@/client/lib/components/button/Button';
import { Layout } from '@/client/lib/components/layout/Layout';
import { Hall } from '@/client/pages/order/hall/Hall';
import { LegendController } from '@/client/pages/order/legend/LegendController';
import { PreCheckController } from '@/client/pages/order/pre-check/PreCheckController';
import { SeatsController } from '@/client/pages/order/seats/SeatsController';
import styles from './styles.module.css';

export type OrderPageProps = {
  totalPrice: number;
}
export const OrderPage = (props: OrderPageProps) => {
  const { totalPrice } = props;
  const isPaymentButtonDisabled = totalPrice === 0;
  const paymentButtonText = isPaymentButtonDisabled ? 'Select seats' : `Proceed to payment: ${totalPrice} RUB`;

  return (
    // TODO Use common "page" component
    <main className={styles.order}>
      <Layout className={styles.orderLayout}>
        <Hall>
          <SeatsController />
        </Hall>
        <LegendController />
        <PreCheckController />
        <div className={styles.orderFooter}>

          <Button disabled={isPaymentButtonDisabled}>{paymentButtonText}</Button>
        </div>

      </Layout>
    </main>
  );
};
