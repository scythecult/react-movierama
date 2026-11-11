import { SERVER_ENTRY_PATH } from '../../../common/constants/common';
import { loadServerEntry } from './loadServerEntry';

const missingModule = () => Promise.reject(Object.assign(new Error('Cannot find module'), { code: 'ERR_MODULE_NOT_FOUND' }));

describe('loadServerEntry', () => {
  test('should keep the original error when the production bundle is missing', async () => {
    const error = await loadServerEntry(missingModule).then(
      () => {
        throw new Error('expected the bundle to be missing');
      },
      (caught: unknown) => caught,
    );

    expect(error).toBeInstanceOf(Error);

    if (!(error instanceof Error)) {
      return;
    }

    expect(error.message).toContain(`SSR entry was not found at ${SERVER_ENTRY_PATH}`);
    expect(error.cause).toMatchObject({ code: 'ERR_MODULE_NOT_FOUND' });
  });

  test('should report a broken bundle separately from a missing file', async () => {
    const cause = new Error('Unexpected token');

    const error = await loadServerEntry(() => Promise.reject(cause)).then(
      () => {
        throw new Error('expected the bundle to fail');
      },
      (caught: unknown) => caught,
    );

    expect(error).toBeInstanceOf(Error);

    if (!(error instanceof Error)) {
      return;
    }

    expect(error.message).toBe('SSR entry failed to load');
    expect(error.cause).toBe(cause);
  });
});
