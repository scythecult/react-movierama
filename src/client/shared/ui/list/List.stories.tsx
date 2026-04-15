import type { Meta, StoryFn } from '@storybook/react-vite';
import { MOCK_LOCATIONS } from '../../../../../mocks/data/locations';
import { List, type ListProps } from './List';

type ItemProps = {
  id: number;
  name: string;
};

const renderItem = (item: ItemProps) => <span key={item.id}>{item.name}</span>;

export default {
  title: 'Components/List',

  args: {
    items: MOCK_LOCATIONS,
    renderItem: (item) => renderItem(item as ItemProps),
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

const Template: StoryFn<ListProps<ItemProps>> = (props) => <List {...props} />;

export const Default = Template.bind(null);
