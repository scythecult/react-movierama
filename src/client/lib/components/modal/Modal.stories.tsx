import type { Meta, StoryFn } from '@storybook/react-vite';
import { Modal, type ModalProps } from './Modal';

export default {
  title: 'Components/Modal',

  component: Modal,

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

    onClick: {
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
} satisfies Meta<typeof Modal>;

const Template: StoryFn<ModalProps> = (props) => <Modal {...props} />;

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
