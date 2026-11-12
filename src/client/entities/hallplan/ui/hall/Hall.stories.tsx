import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hall } from './Hall';

const meta = {
  title: 'Pages/OrderPage/Hall',
  component: Hall,
  args: {
    children: 'Hall Content',
  },
} satisfies Meta<typeof Hall>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
