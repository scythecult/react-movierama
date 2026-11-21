import pino from 'pino';
import { captureLogs } from '../../../../tests/unit/captureLogs';
import { bindRequestLogger, getModuleLogger, LogModule } from './logger';
import { buildLoggerOptions, REDACT_CENSOR, resolveLogLevel } from './loggerOptions';

describe('logger options', () => {
  test('should pretty-print only in development and keep production on raw json', () => {
    const development = buildLoggerOptions('development');
    const production = buildLoggerOptions('production');
    const testEnv = buildLoggerOptions('test');

    expect(development.transport).toEqual({
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    });
    expect(production.transport).toBeUndefined();
    expect(testEnv.transport).toBeUndefined();
    expect(JSON.stringify(production)).not.toContain('destination');
  });

  test('should default production and test to info, development to debug, and honour LOG_LEVEL', () => {
    expect(resolveLogLevel('production')).toBe('info');
    expect(resolveLogLevel('test')).toBe('info');
    expect(resolveLogLevel('development')).toBe('debug');
    expect(resolveLogLevel('production', 'debug')).toBe('debug');
    expect(resolveLogLevel('development', undefined)).toBe('debug');
  });
});

describe('logger', () => {
  test('should redact secrets before they reach stdout', () => {
    const logs = captureLogs();
    const log = pino(buildLoggerOptions('production'), logs.stream);

    log.info(
      {
        email: 'viewer@example.com',
        password: 'secret-pass',
        token: 'secret-token',
        user: { password: 'nested-pass', accessToken: 'access-token' },
        req: {
          headers: {
            cookie: 'connect.sid=abc',
            authorization: 'Bearer xyz',
          },
        },
        res: {
          headers: {
            'set-cookie': 'connect.sid=abc; HttpOnly',
          },
        },
      },
      'sign in',
    );

    const [line] = logs.read();
    const serialized = JSON.stringify(line);

    expect(serialized).not.toContain('secret-pass');
    expect(serialized).not.toContain('secret-token');
    expect(serialized).not.toContain('nested-pass');
    expect(serialized).not.toContain('access-token');
    expect(serialized).not.toContain('connect.sid');
    expect(serialized).not.toContain('Bearer xyz');
    expect(serialized).toContain(REDACT_CENSOR);
    expect(line?.email).toBe('viewer@example.com');
    expect(line?.msg).toBe('sign in');
  });

  test('should keep the request id on a module child logger', () => {
    const logs = captureLogs();
    const log = pino(buildLoggerOptions('production', 'debug'), logs.stream);

    bindRequestLogger(log.child({ reqId: 'req-1', module: 'ssr' }), () => {
      getModuleLogger(LogModule.db).debug({ entity: 'film' }, 'Database operation completed');
    });

    const [line] = logs.read();

    expect(line).toMatchObject({
      module: 'db',
      reqId: 'req-1',
      entity: 'film',
      msg: 'Database operation completed',
    });
    expect(getModuleLogger(LogModule.db).bindings().module).toBe('db');
  });
});
