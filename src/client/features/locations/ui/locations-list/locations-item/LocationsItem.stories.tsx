import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls } from '../../../../../../../.storybook/helpers';
import { MOCK_LOCATIONS } from '../../../../../../../mocks/data/locations';
import { LocationsItem } from './LocationsItem';

const [location] = MOCK_LOCATIONS;

const meta = {
  title: 'Components/LocationsItem',
  component: LocationsItem,
  args: {
    location,
    currentLocationId: location.id,
    onClick: () => {},
  },
  argTypes: hideControls('location', 'currentLocationId', 'onClick'),
} satisfies Meta<typeof LocationsItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
