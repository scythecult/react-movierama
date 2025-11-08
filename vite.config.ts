/// <reference types="vitest/config" />
/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { Config } from './src/common/env';

const isProduction = Config.nodeEnv === 'production';

export default defineConfig({
  // Expose vars here to use it in /common/env.ts
  define: {
    global: 'window',
    'process.env.IS_E2E_TEST_DEBUG_MODE': JSON.stringify(process.env.IS_E2E_TEST_DEBUG_MODE),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.APP_MODE': JSON.stringify(process.env.APP_MODE),
    'process.env.APP_PORT': JSON.stringify(process.env.APP_PORT),
    'process.env.SSR_PORT': JSON.stringify(process.env.SSR_PORT),
    'process.env.APP_URL': JSON.stringify(process.env.APP_URL),
    'process.env.SSR_URL': JSON.stringify(process.env.SSR_URL),
    'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
  },

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

  plugins: [react()],

  test: {
    globals: true,
    css: false,
    environment: 'happy-dom',
    testTimeout: 30 * 1000, // 30 seconds
    clearMocks: true,
    include: ['src/**/*.unit.test.ts(x)?'],
    setupFiles: 'src/tests/globalSetup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/client/**/*'],
      exclude: ['tests/**/*'],
    },
  },
});
