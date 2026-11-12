import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls } from '../../../../../../.storybook/helpers';
import { LinkBar } from './LinkBar';

const meta = {
  title: 'Pages/MainPage/LinkBar',
  component: LinkBar,
  args: {
    children: (
      <>
        <span>Check Link Bar</span>
        <span>Check Link Bar</span>
        <span>Check Link Bar</span>
        <span>Check Link Bar</span>
      </>
    ),
  },
  argTypes: hideControls('children'),
} satisfies Meta<typeof LinkBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
