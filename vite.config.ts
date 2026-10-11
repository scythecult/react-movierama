/// <reference types="vitest/config" />
/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { Config } from './src/common/env.ts';

const isProduction = Config.nodeEnv === 'production';

// Expose these to client code via Vite `define`, so `src/common/env.ts` can read them.
// Vitest copies every `process.env.*` define back onto `process.env`. A missing var is
// `undefined`, and Node stores that assignment as the string "undefined", which then
// fails the Zod defaults. Under Vitest, leave missing vars unset. Vite builds still
// replace them with the identifier `undefined`.
const PROCESS_ENV_KEYS = [
  'IS_E2E_TEST_DEBUG_MODE',
  'NODE_ENV',
  'APP_MODE',
  'APP_PORT',
  'SSR_PORT',
  'APP_URL',
  'SSR_URL',
  'BASE_URL',
  'BCRYPT_SALT_ROUNDS',
] as const;

const processEnvDefine: Record<string, string> = {};

for (const name of PROCESS_ENV_KEYS) {
  const value = process.env[name];

  if (value !== undefined) {
    processEnvDefine[`process.env.${name}`] = JSON.stringify(value);
  } else if (!process.env.VITEST) {
    processEnvDefine[`process.env.${name}`] = 'undefined';
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

  test: {
    globals: true,
    css: false,
    environment: 'happy-dom',
    pool: 'vmThreads',
    testTimeout: 30 * 1000, // 30 seconds
    clearMocks: true,
    include: ['src/**/*.unit.test.ts(x)?'],
    setupFiles: ['src/tests/globalSetup.ts', 'src/tests/vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/client/**/*'],
      exclude: ['tests/**/*'],
    },
  },
});
