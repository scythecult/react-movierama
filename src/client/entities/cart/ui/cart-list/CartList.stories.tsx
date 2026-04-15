import type { Meta, StoryFn } from '@storybook/react-vite';
import { MOCK_SEATS_DATA } from '../../../../../../mocks/data/seats';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/zustand/AppStoreProvider';
import { CartList, type CartListProps } from './CartList';

export default {
  title: 'Pages/OrderPage/CartList',
  component: CartList,

  args: {
    renderRemoveFromCartButton: () => <div>Remove Button</div>,
    renderTicketTypeSelect: () => <div>--Ticket type select--</div>,
  },
  argTypes: {
    renderRemoveFromCartButton: {
      table: {
        disable: true,
      },
    },
    renderTicketTypeSelect: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<CartListProps>;

const Template: StoryFn<CartListProps> = (props) => {
  return (
    <AppStoreProvider initialState={{ cart: MOCK_SEATS_DATA }} store={AppStore}>
      <CartList {...props} />
    </AppStoreProvider>
  );
};

export const Default = Template.bind(null);
