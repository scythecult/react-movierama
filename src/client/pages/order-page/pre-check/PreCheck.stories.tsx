import type { Meta, StoryFn } from '@storybook/react-vite';
import { fn } from 'storybook/internal/test';
import { CART_ITEMS } from '../../../../tests/constants';
import { PreCheck, type PreCheckProps } from './PreCheck';

export default {
  title: 'Pages/PreCheck',
  component: PreCheck,
  args: {
    onRemoveSeatClick: fn(),
    onTicketTypeChange: fn(),
  },
} satisfies Meta<PreCheckProps>;

const Template: StoryFn<PreCheckProps> = (props) => <PreCheck {...props} />;

export const Default = Template.bind(null);
Default.args = {
  cart: CART_ITEMS,
};
