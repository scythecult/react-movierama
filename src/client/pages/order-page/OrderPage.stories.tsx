import type { Meta, StoryFn } from '@storybook/react-vite';
import { AppStoreProvider } from '@/client/lib/contexts/app-store/AppStoreProvider';
import { OrderPage, type OrderPageProps } from './OrderPage';

export default {
  title: 'Pages/OrderPage',
  component: OrderPage,
  args: {
    totalPrice: 0,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<OrderPageProps>;

const Template: StoryFn<OrderPageProps> = (props) => (
  <AppStoreProvider>
    <OrderPage {...props} />
  </AppStoreProvider>
);

export const Default = Template.bind(null);
