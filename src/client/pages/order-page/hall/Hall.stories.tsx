import type { Meta, StoryFn } from '@storybook/react-vite';
import { Hall, type HallProps } from './Hall';

export default {
  title: 'Pages/Hall',
  component: Hall,
} satisfies Meta<typeof Hall>;

const Template: StoryFn<HallProps> = (props) => <Hall {...props}>Hall Content</Hall>;

export const Default = Template.bind(null);
