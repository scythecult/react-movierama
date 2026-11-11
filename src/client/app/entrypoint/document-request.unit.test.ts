// @vitest-environment node

import { createDocumentRequest } from './document-request';

describe('createDocumentRequest', () => {
  test('should keep the query string and drop a trailing slash', () => {
    const documentRequest = createDocumentRequest({
      protocol: 'http',
      originalUrl: '/order/?session=1',
      url: '/order/?session=1',
      method: 'GET',
      headers: {
        host: 'localhost:3001',
        cookie: 'connect.sid=abc',
      },
    });

    expect(documentRequest.url).toBe('http://localhost:3001/order?session=1');
    expect(documentRequest.headers.get('cookie')).toBe('connect.sid=abc');
    expect(documentRequest.headers.get('host')).toBeNull();
  });

  test('should leave the root path untouched', () => {
    const documentRequest = createDocumentRequest({
      protocol: 'https',
      originalUrl: '/?page=2',
      url: '/?page=2',
      method: 'GET',
      headers: { host: 'movierama.test' },
    });

    expect(documentRequest.url).toBe('https://movierama.test/?page=2');
  });
});
