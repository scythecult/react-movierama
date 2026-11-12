import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxInput } from './CheckboxInput';

const meta = {
  title: 'Components/Inputs/CheckboxInput',
  component: CheckboxInput,
  args: {
    children: 'Check',
  },
} satisfies Meta<typeof CheckboxInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
