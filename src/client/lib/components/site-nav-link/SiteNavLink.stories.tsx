import type { Meta, StoryFn } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';
import { AppRoute } from '../../../../common/constants/routes';
import { SiteNavLink } from './SiteNavLink';

export default {
  title: 'Components/SiteNavLink',
  component: SiteNavLink,
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },

    children: {
      table: {
        disable: true,
      },
    },

    to: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof SiteNavLink>;

const Template: StoryFn = () => (
  <BrowserRouter>
    <div style={{ backgroundColor: 'black' }}>
      <SiteNavLink to={AppRoute.ROOT}>Check Link</SiteNavLink>
    </div>
  </BrowserRouter>
);

export const Default = Template.bind(null);
