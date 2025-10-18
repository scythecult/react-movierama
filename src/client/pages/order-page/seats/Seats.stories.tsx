import type { Meta, StoryFn } from '@storybook/react-vite';
import { CANVAS_SIZE, SEATS } from '../../../lib/utils/mocks';
import { Seats, type SeatsProps } from './Seats';

export default {
  title: 'Pages/Seats',
  component: Seats,
  args: {
    seats: SEATS,
    canvasWidth: CANVAS_SIZE.width,
    canvasHeight: CANVAS_SIZE.height,
  },
} satisfies Meta<SeatsProps>;

const Template: StoryFn<SeatsProps> = (props) => <Seats {...props} />;

export const Default = Template.bind(null);
