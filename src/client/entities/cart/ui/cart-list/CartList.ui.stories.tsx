import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls, withProviders } from '../../../../../../.storybook/helpers';
import { MOCK_SEATS_DATA } from '../../../../../../mocks/data/seats';
import { CartListUi } from './CartList.ui';

const meta = {
  title: 'Pages/OrderPage/CartListUi',
  component: CartListUi,
  args: {
    renderRemoveFromCartButton: () => <div>Remove Button</div>,
    renderTicketTypeSelect: () => <div>--Ticket type select--</div>,
  },
  argTypes: hideControls('renderRemoveFromCartButton', 'renderTicketTypeSelect'),
  decorators: [withProviders({ store: { cart: MOCK_SEATS_DATA } })],
} satisfies Meta<typeof CartListUi>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
