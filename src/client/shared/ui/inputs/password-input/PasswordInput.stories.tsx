import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls } from '../../../../../../.storybook/helpers';
import { PasswordInput } from './PasswordInput';

const meta = {
  title: 'Components/Inputs/PasswordInput',
  component: PasswordInput,
  argTypes: hideControls('className', 'inputProps'),
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Password',
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Password',
    inputProps: {
      placeholder: 'Password',
    },
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    error: 'Invalid password',
  },
};
