import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls } from '../../../../../.storybook/helpers';
import { CustomIconName } from './constants';
import { CustomIcon } from './CustomIcon';

const meta = {
  title: 'Components/CustomIcon',
  component: CustomIcon,
  args: {
    name: CustomIconName.ACCOUNT,
  },
  argTypes: hideControls('className'),
} satisfies Meta<typeof CustomIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Account: Story = {
  args: {
    name: CustomIconName.ACCOUNT,
  },
};

export const Pin: Story = {
  args: {
    name: CustomIconName.PIN,
  },
};

export const Cross: Story = {
  args: {
    name: CustomIconName.CROSS,
  },
};
