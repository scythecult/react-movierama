import type { Meta, StoryFn } from '@storybook/react-vite';
import { MOCK_LOCATIONS } from '../../../../../../mocks/data/locations';
import { LocationItem, type LocationItemProps } from './LocationItem';

export default {
  title: 'Components/LocationItem',

  args: {
    locationItem: MOCK_LOCATIONS[0],
    currentLocationId: 1,
  },

  argTypes: {
    locationItem: {
      table: {
        disable: true,
      },
    },

    currentLocationId: {
      table: {
        disable: true,
      },
    },
  },

  component: LocationItem,
} satisfies Meta<typeof LocationItem>;

const Template: StoryFn<LocationItemProps> = (props) => <LocationItem {...props} />;

export const Default = Template.bind(null);
