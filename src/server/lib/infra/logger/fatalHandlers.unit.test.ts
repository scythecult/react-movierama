import pino from 'pino';
import { captureLogs } from '../../../../tests/unit/captureLogs';
import { installFatalHandlers } from './fatalHandlers';
import { buildLoggerOptions } from './loggerOptions';

describe('installFatalHandlers', () => {
  const listeners = new Map<string, (...args: unknown[]) => void>();

  beforeEach(() => {
    listeners.clear();
    vi.spyOn(process, 'on').mockImplementation(((event: string, listener: (...args: unknown[]) => void) => {
      listeners.set(event, listener);

      return process;
    }) as typeof process.on);
    vi.spyOn(process, 'off').mockImplementation(((event: string) => {
      listeners.delete(event);

      return process;
    }) as typeof process.off);
    vi.spyOn(process, 'exit').mockImplementation((() => undefined) as typeof process.exit);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should flush a fatal log and exit on uncaughtException', () => {
    const logs = captureLogs();
    const log = pino(buildLoggerOptions('production'), logs.stream);
    const dispose = installFatalHandlers(log);

    listeners.get('uncaughtException')?.(new Error('process exploded'));

    const text = logs.text();

    expect(text.startsWith('{')).toBe(true);
    expect(text).toContain('Uncaught exception');
    expect(text).toContain('process exploded');
    expect(text).toContain('"module":"process"');
    expect(process.exit).toHaveBeenCalledWith(1);

    dispose();
    expect(listeners.has('uncaughtException')).toBe(false);
  });

  test('should log a non-error rejection before exiting', () => {
    const logs = captureLogs();
    const log = pino(buildLoggerOptions('production'), logs.stream);

    installFatalHandlers(log);
    listeners.get('unhandledRejection')?.('db socket closed');

    expect(logs.text()).toContain('Unhandled rejection');
    expect(logs.text()).toContain('db socket closed');
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
