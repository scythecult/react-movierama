import type { Meta, StoryFn } from '@storybook/react-vite';
import { Button, type ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Check',
  },
} satisfies Meta<typeof Button>;

const Template: StoryFn<ButtonProps> = (props) => <Button {...props} />;

export const Default = Template.bind(null);
Default.args = {
  disabled: true,
};
