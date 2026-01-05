import type { Meta, StoryFn } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TEST_CART_ITEMS } from '../../../../tests/constants';
import { PreCheck, type PreCheckProps } from './PreCheck';

export default {
  title: 'Pages/OrderPage/PreCheck',
  component: PreCheck,

  args: {
    onRemoveSeatClick: fn(),
    onTicketTypeChange: fn(),
  },
  argTypes: {
    onRemoveSeatClick: {
      table: {
        disable: true,
      },
    },
    onTicketTypeChange: {
      table: {
        disable: true,
      },
    },
    cart: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<PreCheckProps>;

const Template: StoryFn<PreCheckProps> = (props) => <PreCheck {...props} />;

export const Default = Template.bind(null);
Default.args = {
  cart: TEST_CART_ITEMS,
};
