import type { StorybookConfig } from '@storybook/react-vite';

// https://www.google.com/search?q=storybook+run+msw+before+initialization&sca_esv=fecb66123620f6bf&sxsrf=ANbL-n6PurzwSFSfc2r-Ba4kHITnfbtlGA%3A1772386002871&ei=0nakaZ3mNLzm7_UP9_e4wQU&biw=2560&bih=1288&oq=storybook+run+msw+before+ini&gs_lp=Egxnd3Mtd2l6LXNlcnAiHHN0b3J5Ym9vayBydW4gbXN3IGJlZm9yZSBpbmkqAggAMgcQIRigARgKMgcQIRigARgKMgcQIRigARgKSOUyUKgWWLQscAN4AJABApgBuAKgAccZqgEHMC43LjguMbgBA8gBAPgBAZgCEaACrRXCAgsQABiABBiwAxiiBMICCBAAGLADGO8FwgIGEAAYFhgewgIIEAAYgAQYogTCAgUQIRigAcICBRAhGJ8FwgIEECEYFZgDAIgGAZAGBZIHBTMuNi44oAekR7IHBTAuNi44uAedFcIHBjEuMTEuNcgHK4AIAA&sclient=gws-wiz-serp
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: ['@chromatic-com/storybook', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
