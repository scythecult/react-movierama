// Reject anything that could break a log line or a response header.
const REQUEST_ID_PATTERN = /^[A-Za-z0-9-]{1,128}$/;

export const readRequestId = (value: unknown) => {
  const candidate = Array.isArray(value) ? value[0] : value;

  if (typeof candidate !== 'string' || !REQUEST_ID_PATTERN.test(candidate)) {
    return;
  }

  return candidate;
};
