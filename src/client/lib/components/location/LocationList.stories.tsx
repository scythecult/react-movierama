import type { Meta, StoryFn } from '@storybook/react-vite';
import { MOCK_GEOLOCATION } from '../../../../../mocks/data/geolocation';
import { MOCK_LOCATIONS } from '../../../../../mocks/data/locations';
import { LocationList, type LocationListProps } from './LocationList';

export default {
  title: 'Components/LocationList',
  args: {
    currentLocation: MOCK_GEOLOCATION,
    locations: MOCK_LOCATIONS,
    onClick: () => {},
  },

  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },

    currentLocation: {
      table: {
        disable: true,
      },
    },

    locations: {
      table: {
        disable: true,
      },
    },

    onClick: {
      table: {
        disable: true,
      },
    },
  },
  component: LocationList,
} satisfies Meta<typeof LocationList>;

const Template: StoryFn<LocationListProps> = (props) => <LocationList {...props} />;

export const Default = Template.bind(null);
