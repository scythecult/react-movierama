import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls } from '../../../../../../../.storybook/helpers';
import { SeatStateMap, SeatTypeMap } from '../const';
import { Seat } from './Seat';

const meta = {
  title: 'Pages/OrderPage/Seat',
  component: Seat,
  args: {
    place: 1,
  },
  argTypes: hideControls('onClick', 'place', 'className', 'x', 'y', 'w', 'h'),
} satisfies Meta<typeof Seat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Comfort: Story = {
  args: {
    type: SeatTypeMap.COMFORT,
  },
};

export const Vip: Story = {
  args: {
    type: SeatTypeMap.VIP,
  },
};

export const Wheelchair: Story = {
  args: {
    type: SeatTypeMap.WHEELCHAIR,
  },
};

export const Occupied: Story = {
  args: {
    type: SeatTypeMap.OCCUPIED,
  },
};

export const Selected: Story = {
  args: {
    state: SeatStateMap.SELECTED,
  },
};
