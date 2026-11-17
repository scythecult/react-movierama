import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { Config } from './src/common/env.ts';

const isProduction = Config.nodeEnv === 'production';

// Expose these to client code via Vite `define`, so `src/common/env.ts` can read them.
// A missing var is replaced with the identifier `undefined`, and Zod applies its default.
// Vitest copies every `process.env.*` define back onto `process.env`. Skip `define` while
// it is running: unit tests assign real strings in `src/tests/vitest.setup.ts` instead.
const PROCESS_ENV_KEYS = [
  'IS_E2E_TEST_DEBUG_MODE',
  'NODE_ENV',
  'APP_MODE',
  'APP_PORT',
  'APP_URL',
  'API_PORT',
  'API_URL',
  'SSR_PORT',
  'SSR_URL',
  'BASE_URL',
  'IS_MOCK_GEOLOCATION',
  'BCRYPT_SALT_ROUNDS',
] as const;

const processEnvDefine: Record<string, string> = {};

if (!process.env.VITEST) {
  for (const name of PROCESS_ENV_KEYS) {
    const value = process.env[name];

    processEnvDefine[`process.env.${name}`] = value !== undefined ? JSON.stringify(value) : 'undefined';
  }
}

export default defineConfig({
  define: processEnvDefine,

  base: Config.baseUrl,

  build: {
    sourcemap: true,
    minify: isProduction,
  },

  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: 'styles_[local]--[hash:base64:4]',
    },
  },

  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
  ],
});
