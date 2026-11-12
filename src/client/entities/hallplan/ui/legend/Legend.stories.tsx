import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls } from '../../../../../../.storybook/helpers';
import { MOCK_SEAT_TYPES } from '../../../../../../mocks/data/seats';
import { Legend } from './Legend';

const meta = {
  title: 'Pages/OrderPage/Legend',
  component: Legend,
  args: {
    seatTypes: MOCK_SEAT_TYPES,
  },
  argTypes: hideControls('seatTypes'),
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Legend>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
