import type { Meta, StoryFn } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';
import { LinkBar } from './LinkBar';

export default {
  title: 'Pages/MainPage/LinkBar',

  component: LinkBar,

  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof LinkBar>;

const Template: StoryFn = () => (
  <BrowserRouter>
    <div style={{ backgroundColor: 'black' }}>
      <LinkBar>
        <span>Check Link Bar</span>
        <span>Check Link Bar</span>
        <span>Check Link Bar</span>
        <span>Check Link Bar</span>
      </LinkBar>
    </div>
  </BrowserRouter>
);

export const Default = Template.bind(null);
