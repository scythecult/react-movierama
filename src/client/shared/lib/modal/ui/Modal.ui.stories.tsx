import type { Meta, StoryFn } from '@storybook/react-vite';
import { ModalUi, type ModalUiProps } from './Modal.ui';

export default {
  title: 'Components/ModalUi',

  component: ModalUi,

  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },

    renderHeader: {
      table: {
        disable: true,
      },
    },

    renderBody: {
      table: {
        disable: true,
      },
    },

    onClose: {
      table: {
        disable: true,
      },
    },
  },

  args: {
    renderHeader: () => <div>Header</div>,
    renderBody: () => <div>Body</div>,
    onClose: () => {},
  },

  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ModalUi>;

const Template: StoryFn<ModalUiProps> = (props) => <ModalUi {...props} />;

export const Default = Template.bind(null);
Default.args = {};

export const WithHeader = Template.bind(null);
WithHeader.args = {
  renderHeader: () => <div>Header #1</div>,
  renderBody: () => <div>Body #2</div>,
  onClose: () => {},
};

export const WithBody = Template.bind(null);
WithBody.args = {
  renderHeader: () => <div>Header #2</div>,
  renderBody: () => <div>Body #1</div>,
  onClose: () => {},
};
