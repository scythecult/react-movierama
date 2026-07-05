import type { Meta, StoryFn } from '@storybook/react-vite';
import { CheckboxInput, type CheckboxInputProps } from './CheckboxInput';

export default {
  title: 'Components/Inputs/CheckboxInput',

  component: CheckboxInput,
} satisfies Meta<typeof CheckboxInput>;

const Template: StoryFn<CheckboxInputProps> = (props) => <CheckboxInput {...props} />;

export const Default = Template.bind(null);
Default.args = {
  children: 'Check',
};
