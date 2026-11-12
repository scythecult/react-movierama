import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls } from '../../../../../.storybook/helpers';
import { MOCK_LOCATIONS } from '../../../../../mocks/data/locations';
import { List } from './List';

type ItemProps = {
  id: number;
  name: string;
};

const renderItem = (item: ItemProps) => <span key={item.id}>{item.name}</span>;

const meta = {
  title: 'Components/List',
  component: List,
  args: {
    items: MOCK_LOCATIONS,
    renderItem: (item) => renderItem(item as ItemProps),
  },
  argTypes: hideControls('items', 'renderItem'),
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
