import type { Meta, StoryFn } from '@storybook/react-vite';
import { MOCK_LOCATIONS } from '../../../../../../../mocks/data/locations';
import { LocationsItem, type LocationsItemProps } from './LocationsItem';

export default {
  title: 'Components/LocationItem',

  args: {
    locationsItem: MOCK_LOCATIONS[0],
    currentLocationId: 1,
  },

  argTypes: {
    locationsItem: {
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

  component: LocationsItem,
} satisfies Meta<typeof LocationsItem>;

const Template: StoryFn<LocationsItemProps> = (props) => <LocationsItem {...props} />;

export const Default = Template.bind(null);
