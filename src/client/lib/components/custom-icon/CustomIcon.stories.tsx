import type { Meta, StoryFn } from '@storybook/react-vite';
import { CustomIconName } from './constants';
import { CustomIcon, type CustomIconProps } from './CustomIcon';

export default {
  title: 'Components/CustomIcon',
  component: CustomIcon,
  args: {
    name: CustomIconName.ACCOUNT,
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CustomIcon>;

const Template: StoryFn<CustomIconProps> = (props) => <CustomIcon {...props} />;

export const Default = Template.bind(null);
Default.args = {};

export const Account = Template.bind(null);
Account.args = {
  name: CustomIconName.ACCOUNT,
};

export const Pin = Template.bind(null);
Pin.args = {
  name: CustomIconName.PIN,
};

export const Cross = Template.bind(null);
Cross.args = {
  name: CustomIconName.CROSS,
};
