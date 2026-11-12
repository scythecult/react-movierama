import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls } from '../../../../../../.storybook/helpers';
import { TextInput } from './TextInput';

const meta = {
  title: 'Components/Inputs/TextInput',
  component: TextInput,
  args: {
    inputProps: {
      placeholder: 'Placeholder',
    },
  },
  argTypes: hideControls('className', 'inputProps'),
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Label',
  },
};

export const WithError: Story = {
  args: {
    error: 'Error',
  },
};

export const WithPrefix: Story = {
  args: {
    prefix: 'Prefix',
  },
};

export const WithSuffix: Story = {
  args: {
    suffix: 'Suffix',
  },
};
