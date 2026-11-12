import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls } from '../../../../../../.storybook/helpers';
import { EmailInput } from './EmailInput';

const meta = {
  title: 'Components/Inputs/EmailInput',
  component: EmailInput,
  argTypes: hideControls('className', 'inputProps'),
} satisfies Meta<typeof EmailInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Label',
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Email',
    inputProps: {
      placeholder: 'Email',
    },
  },
};

export const WithError: Story = {
  args: {
    error: 'Error',
  },
};
