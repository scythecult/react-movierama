import { resolve } from 'node:path';

import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import { defineConfig, globalIgnores } from 'eslint/config';
import boundaries from 'eslint-plugin-boundaries';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tslint from 'typescript-eslint';

const clientLayer = (type) => ({
  type,
  pattern: `${type}/*`,
  basePattern: 'src/client',
  capture: ['slice'],
});

const serverLayer = (type) => ({
  type,
  pattern: `${type}/*`,
  basePattern: 'src/server',
  capture: ['slice'],
});

export default defineConfig([
  globalIgnores(['dist']),

  {
    files: ['**/*.{ts,tsx}'],

    extends: [
      js.configs.recommended,
      tslint.configs.recommended,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
      ...storybook.configs['flat/recommended'],
      ...pluginQuery.configs['flat/recommended'],
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    plugins: {
      'unused-imports': eslintPluginUnusedImports,
      'simple-import-sort': eslintPluginSimpleImportSort,
      boundaries,
    },

    settings: {
      'boundaries/debug': {
        enabled: true,
      },

      'boundaries/root-path': resolve(import.meta.dirname),

      'boundaries/include': ['src/**/*.{ts,tsx}'],

      'boundaries/ignore': [
        '.storybook/**',
        'mocks/**',
        'src/tests/**',
        'playwright.config.ts',
        'vite.config.ts',
        'vitest.config.ts',
      ],

      'boundaries/elements': [
        clientLayer('app'),
        clientLayer('pages'),
        clientLayer('widgets'),
        clientLayer('features'),
        clientLayer('entities'),
        clientLayer('shared'),

        // {
        //   type: 'common',
        //   pattern: 'common/**',
        //   basePattern: 'src',
        // },

        // serverLayer('ssr'),
        // serverLayer('api'),
        // serverLayer('routes'),
        // serverLayer('services'),
        // serverLayer('middleware'),
        // serverLayer('db'),
        // serverLayer('lib'),
      ],
    },

    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            // Client FSD layers (top → bottom)
            {
              from: { type: 'app' },
              allow: {
                to: {
                  type: ['pages', 'widgets', 'features', 'entities', 'shared', 'common'],
                },
              },
            },
            {
              from: { type: 'pages' },
              allow: {
                to: {
                  type: ['widgets', 'features', 'entities', 'shared', 'common'],
                },
              },
            },
            {
              from: { type: 'widgets' },
              allow: {
                to: {
                  type: ['features', 'entities', 'shared', 'common'],
                },
              },
            },
            {
              from: { type: 'features' },
              allow: {
                to: { type: ['entities', 'shared', 'common'] },
              },
            },
            {
              from: { type: 'entities' },
              allow: {
                to: { type: ['shared', 'common'] },
              },
            },
            {
              from: { type: 'shared' },
              allow: {
                to: { type: ['shared', 'common'] },
              },
            },

            // Server layers
            {
              from: { type: 'ssr' },
              allow: {
                to: { type: ['middleware', 'common'] },
              },
            },
            {
              from: { type: 'api' },
              allow: {
                to: { type: ['routes', 'common'] },
              },
            },
            {
              from: { type: 'routes' },
              allow: {
                to: { type: ['services', 'lib', 'common'] },
              },
            },
            {
              from: { type: 'middleware' },
              allow: {
                to: { type: ['app', 'common'] },
              },
            },
            {
              from: { type: 'services' },
              allow: {
                to: { type: ['db', 'lib', 'common', 'entities'] },
              },
            },
            {
              from: { type: 'db' },
              allow: {
                to: { type: ['common', 'entities'] },
              },
            },
            {
              from: { type: 'lib' },
              allow: {
                to: { type: ['lib', 'common'] },
              },
            },

            // Shared code used by both sides
            {
              from: { type: 'common' },
              allow: {
                to: { type: ['common'] },
              },
            },
          ],
        },
      ],

      // no-console statements
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],

      // no empty rules like: if (bla) {}
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],

      // semicolons ALWAYS, this is JS MOTHERFUCKER
      semi: ['error', 'always'],

      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],

      quotes: ['error', 'single', 'avoid-escape'],

      'max-lines': [
        'error',
        {
          max: 500,
        },
      ],

      'arrow-parens': ['error', 'always'],

      '@typescript-eslint/no-var-requires': 'off',

      '@typescript-eslint/no-require-imports': 'off',

      '@typescript-eslint/consistent-type-imports': 'error',

      'simple-import-sort/imports': [
        'error',
        {
          // Disable blank lines between import groups.
          groups: [['^\\u0000', '^@?\\w', '^[^.]', '^\\.']],
        },
      ],

      'simple-import-sort/exports': ['error'],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
          argsIgnorePattern: '^_',
        },
      ],

      'unused-imports/no-unused-imports': 'error',
    },
  },
]);
