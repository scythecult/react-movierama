import type { Meta, StoryFn } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';
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
  <BrowserRouter>
    <Header {...props} />;
  </BrowserRouter>
);

export const Default = Template.bind(null);
Default.args = {};
