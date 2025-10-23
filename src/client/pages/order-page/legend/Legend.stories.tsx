import type { Meta, StoryFn } from '@storybook/react-vite';
import { MOCK_SEAT_TYPES } from '../../../../../mocks/data/seats';
import { Legend, type LegendProps } from './Legend';

export default {
  title: 'Pages/Legend',
  component: Legend,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Legend>;

const Template: StoryFn<LegendProps> = (props) => (
  <div style={{ padding: '2rem' }}>
    <Legend {...props} />
  </div>
);

export const Default = Template.bind(null);
Default.args = {
  seatTypes: MOCK_SEAT_TYPES,
};
