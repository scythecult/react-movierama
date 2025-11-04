import type { Meta, StoryFn } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { enableMocks } from '../../../../mocks';
import { AppStoreProvider } from '../../lib/contexts/app-store/AppStoreProvider';
import { OrderPage } from './OrderPage';

export default {
  title: 'Pages/OrderPage',
  component: OrderPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

// TODO Temporary
const queryClient = new QueryClient();

enableMocks();
const Template: StoryFn = (props) => (
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider>
      <OrderPage {...props} />
    </AppStoreProvider>
  </QueryClientProvider>
);

export const Default = Template.bind(null);
