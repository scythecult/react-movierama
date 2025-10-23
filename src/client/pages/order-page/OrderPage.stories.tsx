import type { Meta, StoryFn } from '@storybook/react-vite';
import { AppStoreProvider } from '../../lib/contexts/app-store/AppStoreProvider';
import { OrderPage } from './OrderPage';

export default {
  title: 'Pages/OrderPage',
  component: OrderPage,
  args: {
    totalPrice: 0,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

const Template: StoryFn = (props) => (
  <AppStoreProvider>
    <OrderPage {...props} />
  </AppStoreProvider>
);

export const Default = Template.bind(null);
