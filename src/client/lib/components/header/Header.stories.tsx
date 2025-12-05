import type { Meta, StoryFn } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';
import { AppStoreProvider } from '../../contexts/app-store/AppStoreProvider';
import { Header, type HeaderProps } from './Header';

export default {
  title: 'Components/Header',
  component: Header,
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
} satisfies Meta<typeof Header>;

const Template: StoryFn<HeaderProps> = (props) => (
  <AppStoreProvider>
    <BrowserRouter>
      <Header {...props} />;
    </BrowserRouter>
  </AppStoreProvider>
);

export const Default = Template.bind(null);
Default.args = {};
