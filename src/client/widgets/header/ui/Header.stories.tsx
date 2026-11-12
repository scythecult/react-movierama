import type { Meta, StoryObj } from '@storybook/react-vite';
import { createStoryQueryClient, hideControls, seedLocations, withProviders } from '../../../../../.storybook/helpers';
import { Header } from './Header';

const queryClient = createStoryQueryClient();
seedLocations(queryClient);

const meta = {
  title: 'Components/Header',
  component: Header,
  argTypes: hideControls('className'),
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withProviders({ queryClient, router: true })],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
