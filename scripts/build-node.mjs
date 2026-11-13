import { build } from 'esbuild';

const shared = {
  bundle: true,
  splitting: true,
  platform: 'node',
  format: 'esm',
  packages: 'external',
  sourcemap: true,
  logLevel: 'info',
  chunkNames: 'chunks/[name]-[hash]',
};

await build({
  ...shared,
  entryPoints: ['src/server/ssr/index.ts'],
  outdir: 'dist/ssr',
});

await build({
  ...shared,
  entryPoints: ['src/server/api/index.ts'],
  outdir: 'dist/api',
});
