import type { Meta, StoryObj } from '@storybook/react-vite';
import { createStoryQueryClient, hideControls, seedLocations, withProviders } from '../../../../../../.storybook/helpers';
import { LocationsList } from './LocationsList';

const queryClient = createStoryQueryClient();
seedLocations(queryClient);

const meta = {
  title: 'Components/LocationsList',
  component: LocationsList,
  argTypes: hideControls('className'),
  decorators: [withProviders({ queryClient })],
} satisfies Meta<typeof LocationsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
