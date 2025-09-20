// import { MoviePicker } from '../movie-picker/MoviePicker';
import { Layout } from '@/client/lib/components/layout/Layout';
import { Hall } from '@/client/pages/order/hall/Hall';
import { Info } from '@/client/pages/order/info/Info';
import { Legend } from '@/client/pages/order/legend/Legend';
import { Seats } from '@/client/pages/order/seats/Seats';
import styles from './styles.module.css';

export const Order = () => {
  return (
    // TODO Use common "page" component
    <main className={styles.order}>
      <Layout className={styles.orderLayout}>
        <h1>Order</h1>
        <Legend />
        <Hall>
          <Seats />
        </Hall>
        <Info />
      </Layout>
    </main>
  );
};
