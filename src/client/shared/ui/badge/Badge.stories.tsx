import type { Meta, StoryFn } from '@storybook/react-vite';
import { Badge, type BadgeProps } from './Badge';

export default {
  title: 'Components/Badge',

  args: {
    children: 22,
  },

  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },

    className: {
      table: {
        disable: true,
      },
    },
  },

  component: Badge,
} satisfies Meta<typeof Badge>;

const Template: StoryFn<BadgeProps> = (props) => <Badge {...props} />;

export const Default = Template.bind(null);
