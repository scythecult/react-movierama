export const ErrorCode = {
  ERR_NF: 'ERR_NF',
  ERR_VALID: 'ERR_VALID',
  ERR_DB: 'ERR_DB',
  ERR_AUTH: 'ERR_AUTH',
  ERR_EXISTS: 'ERR_EXISTS',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
