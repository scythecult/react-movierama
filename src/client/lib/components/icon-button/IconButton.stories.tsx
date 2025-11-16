import type { Meta, StoryFn } from '@storybook/react-vite';
import { IconButton, IconButtonName, type IconButtonProps } from './IconButton';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    name: IconButtonName.LOCATION,
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof IconButton>;

const Template: StoryFn<IconButtonProps> = (props) => <IconButton {...props} />;

export const Default = Template.bind(null);
Default.args = {
  name: IconButtonName.LOCATION,
  children: 'Current Location',
};

export const Login = Template.bind(null);
Login.args = {
  name: IconButtonName.LOGIN,
  children: 'User Name',
};
