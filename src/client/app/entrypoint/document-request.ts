type HeaderValue = string | string[] | undefined;

type DocumentRequestSource = {
  protocol?: string;
  originalUrl?: string;
  url: string;
  method: string;
  headers: {
    host?: HeaderValue;
    [key: string]: HeaderValue;
  };
};

// `host` is a forbidden Fetch header. Routing uses the URL; loaders read cookies from the request context.
const SKIPPED_HEADERS = new Set(['host', 'connection', 'content-length', 'transfer-encoding']);

export const createDocumentRequest = (request: DocumentRequestSource, signal?: AbortSignal) => {
  const hostHeader = request.headers.host;
  const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader;
  const url = new URL(request.originalUrl || request.url, `${request.protocol || 'http'}://${host || 'localhost'}`);

  if (url.pathname.length > 1) {
    url.pathname = url.pathname.replace(/\/$/, '');
  }

  const headers = new Headers();

  for (const [key, value] of Object.entries(request.headers)) {
    if (value === undefined || SKIPPED_HEADERS.has(key.toLowerCase())) {
      continue;
    }

    headers.set(key, Array.isArray(value) ? value.join(', ') : value);
  }

  return new Request(url, {
    method: request.method,
    headers,
    ...(signal ? { signal } : {}),
  });
};
