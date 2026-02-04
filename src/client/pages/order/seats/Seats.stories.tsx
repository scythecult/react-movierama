import type { Meta, StoryFn } from '@storybook/react-vite';
import { MOCK_CANVAS_SIZE, MOCK_SEATS_DATA } from '../../../../../mocks/data/seats';
import { Seats, type SeatsProps } from './Seats';

export default {
  title: 'Pages/OrderPage/Seats',

  component: Seats,

  args: {
    seats: MOCK_SEATS_DATA,
    cart: [],
    canvasWidth: MOCK_CANVAS_SIZE.width,
    canvasHeight: MOCK_CANVAS_SIZE.height,
  },

  argTypes: {
    seats: {
      table: {
        disable: true,
      },
    },

    cart: {
      table: {
        disable: true,
      },
    },

    canvasWidth: {
      table: {
        disable: true,
      },
    },

    canvasHeight: {
      table: {
        disable: true,
      },
    },

    onClick: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<SeatsProps>;

const Template: StoryFn<SeatsProps> = (props) => <Seats {...props} />;

export const Default = Template.bind(null);
