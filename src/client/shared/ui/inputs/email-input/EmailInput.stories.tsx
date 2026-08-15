import type { Meta, StoryFn } from '@storybook/react-vite';
import type { TextInputProps } from '../text-input/TextInput';
import { EmailInput } from './EmailInput';

export default {
  title: 'Components/Inputs/EmailInput',

  component: EmailInput,

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
} satisfies Meta<typeof EmailInput>;

const Template: StoryFn<TextInputProps> = (props) => <EmailInput {...props} />;

export const Default = Template.bind(null);
Default.args = {};

export const WithLabel = Template.bind(null);
WithLabel.args = {
  label: 'Label',
};

export const WithPlaceholder = Template.bind(null);
WithPlaceholder.args = {
  label: 'Email',
  inputProps: {
    placeholder: 'Email',
  },
};

export const WithError = Template.bind(null);
WithError.args = {
  error: 'Error',
};
