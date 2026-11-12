import type { StorybookConfig } from '@storybook/react-vite';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';

const workerPath = resolve(dirname(fileURLToPath(import.meta.url)), '../mockServiceWorker.js');

const serveMswWorker = (): Plugin => ({
  name: 'storybook-msw-worker',
  configureServer(server) {
    server.middlewares.use((request, response, next) => {
      if (request.url?.split('?')[0] !== '/mockServiceWorker.js') {
        next();
        return;
      }

      response.setHeader('Content-Type', 'application/javascript');
      response.end(readFileSync(workerPath));
    });
  },
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'mockServiceWorker.js',
      source: readFileSync(workerPath),
    });
  },
});

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

  async viteFinal(viteConfig) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(viteConfig, {
      plugins: [serveMswWorker()],
    });
  },
};

export default config;
