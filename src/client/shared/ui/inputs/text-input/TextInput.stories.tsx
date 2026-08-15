import type { Meta, StoryFn } from '@storybook/react-vite';
import { TextInput, type TextInputProps } from './TextInput';

export default {
  title: 'Components/Inputs/TextInput',

  component: TextInput,

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
} satisfies Meta<typeof TextInput>;

const Template: StoryFn<TextInputProps> = (props) => <TextInput {...props} />;

export const Default = Template.bind(null);
Default.args = {
  error: 'Error',
  prefix: 'Prefix',
  suffix: 'Suffix',
  inputProps: {
    placeholder: 'Placeholder',
  },
};

export const WithLabel = Template.bind(null);
WithLabel.args = {
  ...Default.args,
  label: 'Label',
};

export const WithError = Template.bind(null);
WithError.args = {
  ...Default.args,
  error: 'Error',
};

export const WithPrefix = Template.bind(null);
WithPrefix.args = {
  ...Default.args,
  prefix: 'Prefix',
  suffix: '',
};

export const WithSuffix = Template.bind(null);
WithSuffix.args = {
  ...Default.args,
  suffix: 'Suffix',
  prefix: '',
};
