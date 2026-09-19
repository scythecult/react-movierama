import type { Meta, StoryFn } from '@storybook/react-vite';
import { Spinner, type SpinnerProps } from './Spinner';

export default {
  title: 'Components/Spinner',

  component: Spinner,

  argTypes: {
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'select' },
    },

    className: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Spinner>;

const Template: StoryFn<SpinnerProps> = (props) => <Spinner {...props} />;

export const Default = Template.bind(null);
Default.args = {};
