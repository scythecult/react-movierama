import type { Meta, StoryFn } from '@storybook/react-vite';
import { SkeletonVariant } from './constants';
import { Skeleton, type SkeletonProps } from './Skeleton';

export default {
  title: 'Components/Skeleton',

  component: Skeleton,

  argTypes: {
    variant: {
      options: Object.values(SkeletonVariant),
      control: { type: 'select' },
    },

    className: {
      table: {
        disable: true,
      },
    },

    width: {
      table: {
        disable: true,
      },
    },

    height: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

const Template: StoryFn<SkeletonProps> = (props) => (
  <div style={{ minHeight: '300px', width: '300px' }}>
    <Skeleton {...props} />
  </div>
);

export const Default = Template.bind(null);
Default.args = {};
