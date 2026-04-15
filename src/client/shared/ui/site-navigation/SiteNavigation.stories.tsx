import type { Meta, StoryFn } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';
import { SiteNavigation } from './SiteNavigation';

export default {
  title: 'Components/SiteNavigation',

  component: SiteNavigation,
} satisfies Meta<typeof SiteNavigation>;

const Template: StoryFn = () => (
  <BrowserRouter>
    <div style={{ backgroundColor: 'black' }}>
      <SiteNavigation />
    </div>
  </BrowserRouter>
);

export const Default = Template.bind(null);
