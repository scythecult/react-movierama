import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

// Vitest prefers this file over vite.config.ts and would otherwise ignore the
// app plugins. mergeConfig keeps React, SVGR, CSS modules, and the env `define`.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      // CSS modules still export stable class names. The PostCSS pipeline is skipped.
      css: false,
      // Each file is isolated in a vm. The `isolate` option does not apply here.
      pool: 'vmThreads',
      // History only. `mockReset` would wipe module-level `vi.fn().mockResolvedValue(...)`.
      // `restoreMocks` would undo spies installed while the file is imported.
      clearMocks: true,
      setupFiles: ['src/tests/vitest.setup.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        include: ['src/client/**/*.{ts,tsx}'],
        // Stories and browser tests sit next to client source. Unit tests are already excluded.
        exclude: ['**/*.stories.{ts,tsx}', '**/*.e2e.test.{ts,tsx}'],
      },
      projects: [
        {
          extends: true,
          test: {
            name: 'dom',
            environment: 'happy-dom',
            include: ['src/**/*.unit.test.tsx'],
          },
        },
        {
          extends: true,
          test: {
            name: 'node',
            environment: 'node',
            include: ['src/**/*.unit.test.ts'],
          },
        },
      ],
    },
  }),
);
