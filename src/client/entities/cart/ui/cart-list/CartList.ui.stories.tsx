import type { Meta, StoryFn } from '@storybook/react-vite';
import { MOCK_SEATS_DATA } from '../../../../../../mocks/data/seats';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/lib/store';
import { CartListUi, type CartListUiProps } from './CartList.ui';

export default {
  title: 'Pages/OrderPage/CartListUi',
  component: CartListUi,

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
} satisfies Meta<CartListUiProps>;

const Template: StoryFn<CartListUiProps> = (props) => {
  return (
    <AppStoreProvider initialState={{ cart: MOCK_SEATS_DATA }} store={AppStore}>
      <CartListUi {...props} />
    </AppStoreProvider>
  );
};

export const Default = Template.bind(null);
