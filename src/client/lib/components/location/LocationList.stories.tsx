import type { Meta, StoryFn } from '@storybook/react-vite';
import { LocationList, type LocationListProps } from './LocationList';

export default {
  title: 'Components/LocationList',

  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },

  component: LocationList,
} satisfies Meta<typeof LocationList>;

const Template: StoryFn<LocationListProps> = (props) => <LocationList {...props} />;

export const Default = Template.bind(null);
