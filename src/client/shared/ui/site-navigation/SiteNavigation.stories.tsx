import type { Meta, StoryObj } from '@storybook/react-vite';
import { withProviders } from '../../../../../.storybook/helpers';
import { SiteNavigation } from './SiteNavigation';

const meta = {
  title: 'Components/SiteNavigation',
  component: SiteNavigation,
  decorators: [withProviders({ router: true })],
} satisfies Meta<typeof SiteNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
