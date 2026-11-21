import type { QueryClient } from '@tanstack/react-query';
import { readRequestId } from '../../../common/helpers/logger';

export type SsrRequestContext = {
  requestId?: string;
  cookie?: string;
  forwardedFor?: string;
  userAgent?: string;
  acceptLanguage?: string;
  signal?: AbortSignal;
  queryClient?: QueryClient;
};

type HeaderValue = string | string[] | undefined;

type SsrRequestLike = {
  id?: unknown;
  ip?: string;
  headers: {
    cookie?: HeaderValue;
    'x-forwarded-for'?: HeaderValue;
    'user-agent'?: HeaderValue;
    'accept-language'?: HeaderValue;
  };
};

type RequestContextStorage = {
  run<T>(context: SsrRequestContext, callback: () => T): T;
  getStore(): SsrRequestContext | undefined;
};

// The SSR entry installs AsyncLocalStorage here. The client bundle never imports node:async_hooks.
let storage: RequestContextStorage | undefined;

export const setRequestContextStorage = (nextStorage: RequestContextStorage | undefined) => {
  storage = nextStorage;
};

export const getRequestContext = () => storage?.getStore();

export const runWithRequestContext = <T>(context: SsrRequestContext, callback: () => T): T => {
  if (!storage) {
    return callback();
  }

  return storage.run(context, callback);
};

const readHeader = (value: HeaderValue) => {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  return value;
};

export const toSsrRequestContext = (request: SsrRequestLike): SsrRequestContext => {
  const requestId = readRequestId(request.id);

  return {
    ...(requestId ? { requestId } : {}),
    cookie: readHeader(request.headers.cookie),
    // Express resolves the viewer address from the trusted proxy hop.
    forwardedFor: request.ip,
    userAgent: readHeader(request.headers['user-agent']),
    acceptLanguage: readHeader(request.headers['accept-language']),
  };
};
