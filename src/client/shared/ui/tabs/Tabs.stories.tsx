import type { Meta, StoryFn } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const items = [
  { label: 'Tab 1', content: 'content 1' },
  { label: 'Tab 2', content: 'content 2' },
  { label: 'Tab 3', content: 'content 3' },
];

export default {
  title: 'Components/Tabs',

  component: Tabs,

  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },

    items: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Tabs>;

const Template: StoryFn = () => <Tabs items={items} />;

export const Default = Template.bind(null);
