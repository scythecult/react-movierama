import type { LoggerOptions } from 'pino';

const LOG_LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'] as const;

export type LogLevel = (typeof LOG_LEVELS)[number];

export const REDACT_CENSOR = '[Redacted]';

// fast-redact paths. Wildcards cover objects we log ourselves; req/res paths cover pino-http.
export const REDACT_PATHS = [
  'password',
  'pass',
  'token',
  'accessToken',
  'refreshToken',
  'idToken',
  'secret',
  'apiKey',
  'authorization',
  'cookie',
  'cookies',
  'set-cookie',
  '*.password',
  '*.pass',
  '*.token',
  '*.accessToken',
  '*.refreshToken',
  '*.idToken',
  '*.secret',
  '*.apiKey',
  '*.authorization',
  '*.cookie',
  '*.cookies',
  '*.["set-cookie"]',
  '*.*.password',
  '*.*.token',
  '*.*.accessToken',
  '*.*.refreshToken',
  '*.*.secret',
  '*.*.authorization',
  '*.*.cookie',
  '*.headers.authorization',
  '*.headers.cookie',
  '*.headers["set-cookie"]',
  '*.headers["x-api-key"]',
  '*.headers["x-auth-token"]',
  '*.headers["proxy-authorization"]',
  '*.*.headers.authorization',
  '*.*.headers.cookie',
  '*.*.headers["set-cookie"]',
  '*.*.headers["x-api-key"]',
  'req.headers.authorization',
  'req.headers.cookie',
  'req.headers["x-api-key"]',
  'req.headers["x-auth-token"]',
  'req.headers["proxy-authorization"]',
  'res.headers["set-cookie"]',
  'res.headers.authorization',
  'res.headers.cookie',
  'headers.authorization',
  'headers.cookie',
  'headers["set-cookie"]',
  'headers["x-api-key"]',
  'headers["proxy-authorization"]',
];

const isLogLevel = (value: LogLevel | undefined): value is LogLevel =>
  value !== undefined && LOG_LEVELS.includes(value);

export const resolveLogLevel = (nodeEnv: string, configuredLevel?: LogLevel): LogLevel => {
  if (isLogLevel(configuredLevel)) {
    return configuredLevel;
  }

  if (nodeEnv === 'production' || nodeEnv === 'test') {
    return 'info';
  }

  return 'debug';
};

export const buildLoggerOptions = (nodeEnv: string, configuredLevel?: LogLevel): LoggerOptions => {
  const options: LoggerOptions = {
    level: resolveLogLevel(nodeEnv, configuredLevel),
    redact: {
      paths: REDACT_PATHS,
      censor: REDACT_CENSOR,
    },
  };

  // Pretty-printing runs in a worker thread and only in development.
  // Production keeps newline-delimited JSON on stdout for the log collector.
  if (nodeEnv === 'development') {
    options.transport = {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    };
  }

  return options;
};
