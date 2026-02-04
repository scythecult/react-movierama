import type { Meta, StoryFn } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';
import { Logo } from './Logo';

export default {
  title: 'Components/Logo',

  component: Logo,
} satisfies Meta<typeof Logo>;

const Template: StoryFn = () => (
  <BrowserRouter>
    <Logo />
  </BrowserRouter>
);

export const Default = Template.bind(null);
