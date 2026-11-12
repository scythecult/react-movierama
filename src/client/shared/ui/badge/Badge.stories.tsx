import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls } from '../../../../../.storybook/helpers';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 22,
  },
  argTypes: hideControls('children', 'className'),
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
