import type { Logger } from 'pino';
import { getModuleLogger, LogModule } from '../lib/infra/logger';
import { withDbLogging } from './withDbLogging';

vi.mock('../lib/infra/logger', () => ({
  LogModule: {
    api: 'api',
    ssr: 'ssr',
    db: 'db',
  },
  getModuleLogger: vi.fn(),
}));

describe('withDbLogging', () => {
  const debug = vi.fn();
  const error = vi.fn();

  beforeEach(() => {
    debug.mockReset();
    error.mockReset();
    vi.mocked(getModuleLogger).mockReturnValue({ debug, error } as unknown as Logger);
  });

  test('should log a completed call without dropping the result', async () => {
    class FakeDb {
      #rows = ['film-1'];

      async findMany() {
        return this.#rows;
      }
    }

    const db = withDbLogging('film', new FakeDb());
    const rows = await db.findMany();

    expect(rows).toEqual(['film-1']);
    expect(getModuleLogger).toHaveBeenCalledWith(LogModule.db);
    expect(debug).toHaveBeenCalledWith(
      expect.objectContaining({ entity: 'film', operation: 'findMany' }),
      'Database operation completed',
    );
    expect(JSON.stringify(debug.mock.calls)).not.toContain('film-1');
  });

  test('should log the error first and rethrow it', async () => {
    const failure = new Error('db down');
    const db = withDbLogging('user', {
      async create() {
        throw failure;
      },
    });

    await expect(db.create()).rejects.toBe(failure);
    expect(error).toHaveBeenCalledWith(expect.objectContaining({ err: failure, entity: 'user', operation: 'create' }), 'Database operation failed');
  });
});
