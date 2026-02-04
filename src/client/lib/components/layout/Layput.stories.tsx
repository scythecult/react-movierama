import type { Meta, StoryFn } from '@storybook/react-vite';
import { Layout, type LayoutProps } from './Layout';

export default {
  title: 'Components/Layout',

  component: Layout,

  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Layout>;

const Template: StoryFn<LayoutProps> = (props) => <Layout {...props} />;

export const Default = Template.bind(null);
Default.args = {
  children: <div style={{ backgroundColor: 'red' }}>Lorem ipsum</div>,
};
