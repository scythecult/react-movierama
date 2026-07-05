import type { Meta, StoryFn } from '@storybook/react-vite';
import type { TextInputProps } from '../text-input/TextInput';
import { PasswordInput } from './PasswordInput';

export default {
  title: 'Components/Inputs/PasswordInput',

  component: PasswordInput,

  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },

    inputProps: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof PasswordInput>;

const Template: StoryFn<TextInputProps> = (props) => <PasswordInput {...props} />;

export const Default = Template.bind(null);
Default.args = {};

export const WithLabel = Template.bind(null);
WithLabel.args = {
  label: 'Password',
};

export const WithPlaceholder = Template.bind(null);
WithPlaceholder.args = {
  label: 'Password',
  inputProps: {
    placeholder: 'Password',
  },
};

export const WithError = Template.bind(null);
WithError.args = {
  label: 'Password',
  error: 'Invalid password',
};
