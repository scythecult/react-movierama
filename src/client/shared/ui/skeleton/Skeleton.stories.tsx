import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls } from '../../../../../.storybook/helpers';
import { SkeletonVariant } from './constants';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  args: {
    width: '120px',
    height: '120px',
  },
  argTypes: {
    ...hideControls('className'),
    variant: {
      options: Object.values(SkeletonVariant),
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
