import type { Meta, StoryObj } from '@storybook/react-vite';
import { createStoryQueryClient, seedLocations, withProviders } from '../../../../../../.storybook/helpers';
import { LocationsButton } from './LocationsButton';

const queryClient = createStoryQueryClient();
seedLocations(queryClient);

const meta = {
  title: 'Components/LocationsButton',
  component: LocationsButton,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withProviders({ queryClient })],
} satisfies Meta<typeof LocationsButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
