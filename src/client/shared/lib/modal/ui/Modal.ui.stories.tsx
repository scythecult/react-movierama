import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls } from '../../../../../../.storybook/helpers';
import { ModalUi } from './Modal.ui';

const meta = {
  title: 'Components/ModalUi',
  component: ModalUi,
  args: {
    renderHeader: () => <div>Header</div>,
    renderBody: () => <div>Body</div>,
    onClose: () => {},
  },
  argTypes: hideControls('className', 'renderHeader', 'renderBody', 'onClose'),
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ModalUi>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHeader: Story = {
  args: {
    renderHeader: () => <div>Header #1</div>,
  },
};

export const WithBody: Story = {
  args: {
    renderBody: () => <div>Body #1</div>,
  },
};
