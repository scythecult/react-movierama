// import { MoviePicker } from '../movie-picker/MoviePicker';
import { Layout } from '@/client/lib/components/layout/Layout';
import type { SeatData } from '@/client/lib/types/OrderData';
import { Hall } from '@/client/pages/order/hall/Hall';
import { Info } from '@/client/pages/order/info/Info';
import { Legend } from '@/client/pages/order/legend/Legend';
import { Seats } from '@/client/pages/order/seats/Seats';
import styles from './styles.module.css';

type OrderProps = {
  seats: SeatData[][];
  totalPrice: number;
  onSeatClick?: (seatId: string, isSelected: boolean) => void;
};

export const Order = (props: OrderProps) => {
  const { seats, totalPrice, onSeatClick } = props;

  return (
    // TODO Use common "page" component
    <main className={styles.order}>
      TotalPrice: {totalPrice}
      <Layout className={styles.orderLayout}>
        <h1>Order</h1>
        <Legend />
        <Hall>
          <Seats seats={seats} onClick={onSeatClick} />
        </Hall>
        <Info />
      </Layout>
    </main>
  );
};
