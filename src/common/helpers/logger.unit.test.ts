import { readRequestId } from './logger';

describe('readRequestId', () => {
  test('should accept a uuid and a header array', () => {
    expect(readRequestId('6b3e1c3a-1f4d-4d8a-9c2e-0a1b2c3d4e5f')).toBe('6b3e1c3a-1f4d-4d8a-9c2e-0a1b2c3d4e5f');
    expect(readRequestId(['req-1', 'req-2'])).toBe('req-1');
  });

  test('should reject values that can inject extra log lines', () => {
    expect(readRequestId('req\ninjected')).toBeUndefined();
    expect(readRequestId('req injected')).toBeUndefined();
    expect(readRequestId('')).toBeUndefined();
    expect(readRequestId(undefined)).toBeUndefined();
    expect(readRequestId(15)).toBeUndefined();
  });
});
