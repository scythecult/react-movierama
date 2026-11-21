const STATIC_FILE_EXTENSIONS = new Set([
  '.js',
  '.mjs',
  '.cjs',
  '.css',
  '.map',
  '.svg',
  '.ico',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.avif',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.txt',
  '.xml',
  '.ts',
  '.tsx',
  '.jsx',
]);

const STATIC_PATH_PREFIXES = ['/assets/', '/static/', '/src/', '/@', '/node_modules/'];

export const isStaticRequest = (url: string | undefined) => {
  if (!url) {
    return false;
  }

  const path = (url.split('?')[0] ?? '').toLowerCase();

  if (STATIC_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))) {
    return true;
  }

  const extensionIndex = path.lastIndexOf('.');

  if (extensionIndex === -1) {
    return false;
  }

  return STATIC_FILE_EXTENSIONS.has(path.slice(extensionIndex));
};
