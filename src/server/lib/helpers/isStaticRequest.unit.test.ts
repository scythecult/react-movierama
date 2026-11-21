import { isStaticRequest } from './isStaticRequest';

describe('isStaticRequest', () => {
  test('should ignore asset, source, and vite urls', () => {
    expect(isStaticRequest('/assets/index-a1b2.js')).toBe(true);
    expect(isStaticRequest('/assets/index-a1b2.css?v=1')).toBe(true);
    expect(isStaticRequest('/src/client/app/entrypoint/entryClient.tsx')).toBe(true);
    expect(isStaticRequest('/@vite/client')).toBe(true);
    expect(isStaticRequest('/node_modules/.vite/deps/react.js')).toBe(true);
    expect(isStaticRequest('/favicon.ico')).toBe(true);
    expect(isStaticRequest('/poster.webp')).toBe(true);
  });

  test('should keep documents, health, and api routes', () => {
    expect(isStaticRequest('/order')).toBe(false);
    expect(isStaticRequest('/health')).toBe(false);
    expect(isStaticRequest('/v1/films?page=1')).toBe(false);
    expect(isStaticRequest('/index.html')).toBe(false);
    expect(isStaticRequest(undefined)).toBe(false);
  });
});
