import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls } from '../../../../../.storybook/helpers';
import { CustomIconName } from '../custom-icon/constants';
import { IconButton } from './IconButton';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    name: CustomIconName.ACCOUNT,
  },
  argTypes: hideControls('className', 'onClick'),
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: CustomIconName.PIN,
    children: 'Current Location',
  },
};

export const Login: Story = {
  args: {
    name: CustomIconName.ACCOUNT,
    children: 'User Name',
  },
};
