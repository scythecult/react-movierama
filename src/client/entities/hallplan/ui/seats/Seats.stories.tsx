import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls } from '../../../../../../.storybook/helpers';
import { MOCK_CANVAS_SIZE, MOCK_SEATS_DATA } from '../../../../../../mocks/data/seats';
import { Seats } from './Seats';

const meta = {
  title: 'Pages/OrderPage/Seats',
  component: Seats,
  args: {
    seats: MOCK_SEATS_DATA,
    cart: [],
    canvasWidth: MOCK_CANVAS_SIZE.width,
    canvasHeight: MOCK_CANVAS_SIZE.height,
    renderAddToCartButton: () => <div>Add To Cart Button</div>,
  },
  argTypes: hideControls('seats', 'cart', 'canvasWidth', 'canvasHeight', 'onClick', 'renderAddToCartButton'),
} satisfies Meta<typeof Seats>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
