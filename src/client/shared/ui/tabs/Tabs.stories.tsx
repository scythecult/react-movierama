import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls } from '../../../../../.storybook/helpers';
import { Tabs } from './Tabs';

const items = [
  { label: 'Tab 1', content: () => 'content 1' },
  { label: 'Tab 2', content: () => 'content 2' },
  { label: 'Tab 3', content: () => 'content 3' },
];

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    items,
  },
  argTypes: hideControls('className', 'items'),
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
