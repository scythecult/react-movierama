import '../static/css/common.css';
import type { Preview } from '@storybook/react-vite';
import { startStorybookMocks, withStorybookDocument } from './helpers';

const preview: Preview = {
  decorators: [withStorybookDocument],
  loaders: [
    async () => {
      await startStorybookMocks();
    },
  ],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
