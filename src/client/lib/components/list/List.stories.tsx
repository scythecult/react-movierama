import type { Meta, StoryFn } from '@storybook/react-vite';
import { MOCK_LOCATIONS } from '../../../../../mocks/data/locations';
import type { LocationsData } from '../../../../common/types/locations';
import { List, type ListProps } from './List';

export default {
  title: 'Components/List',

  args: {
    items: MOCK_LOCATIONS,
  },

  argTypes: {
    items: {
      table: {
        disable: true,
      },
    },

    renderItem: {
      table: {
        disable: true,
      },
    },
  },

  component: List,
} satisfies Meta<typeof List>;

const Template: StoryFn<ListProps<LocationsData[]>> = (props) => <List {...props} />;

export const Default = Template.bind(null);
