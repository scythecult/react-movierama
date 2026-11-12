import type { Meta, StoryObj } from '@storybook/react-vite';
import { withProviders } from '../../../../../.storybook/helpers';
import { Logo } from './Logo';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  decorators: [withProviders({ router: true })],
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
