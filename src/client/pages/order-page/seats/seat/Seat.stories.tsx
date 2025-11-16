import type { Meta, StoryFn } from '@storybook/react-vite';
import { Seat, type SeatProps } from './Seat';

export default {
  title: 'Pages/Order-Page/Seat',
  component: Seat,
  args: {
    place: 1,
  },
  argTypes: {
    onClick: {
      table: {
        disable: true,
      },
    },
    place: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    state: {
      table: {
        disable: true,
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
    x: {
      table: {
        disable: true,
      },
    },
    y: {
      table: {
        disable: true,
      },
    },
    w: {
      table: {
        disable: true,
      },
    },
    h: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<SeatProps>;

const Template: StoryFn<SeatProps> = (props) => <Seat {...props} />;
export const Default = Template.bind(null);

export const Comfort = Template.bind(null);
Comfort.args = {
  type: 2,
};

export const Vip = Template.bind(null);
Vip.args = {
  type: 3,
};

export const Wheelchair = Template.bind(null);
Wheelchair.args = {
  type: 4,
};

export const Occupied = Template.bind(null);
Occupied.args = {
  state: 2,
};

export const Selected = Template.bind(null);
Selected.args = {
  state: 3,
};
