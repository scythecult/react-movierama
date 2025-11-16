import type { Meta, StoryFn } from '@storybook/react-vite';
import { Logo } from './Logo';

export default {
  title: 'Components/Logo',
  component: Logo,
} satisfies Meta<typeof Logo>;

const Template: StoryFn = () => <Logo />;

export const Default = Template.bind(null);
