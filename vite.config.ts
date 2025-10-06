/// <reference types="vitest/config" />
/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: 'styles_[local]--[hash:base64:4]',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    css: false,
    environment: 'happy-dom',
    // 30 seconds.
    testTimeout: 30 * 1000,
    clearMocks: true,
    // fileParallelism: false,
    include: ['src/**/*.test.ts(x)?'],
    setupFiles: 'src/tests/globalSetup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/client/**/*'],
      exclude: ['tests/**/*'],
    },
  },
});
