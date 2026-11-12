import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls, withProviders } from '../../../../../.storybook/helpers';
import { AppRoute } from '../../../../common/constants/routes';
import { SiteNavLink } from './SiteNavLink';

const meta = {
  title: 'Components/SiteNavLink',
  component: SiteNavLink,
  args: {
    to: AppRoute.ROOT,
    children: 'Check Link',
  },
  argTypes: hideControls('className', 'children', 'to'),
  decorators: [withProviders({ router: true })],
} satisfies Meta<typeof SiteNavLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
