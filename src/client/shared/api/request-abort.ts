const readErrorName = (error: unknown) => {
  if (typeof error === 'object' && error !== null && 'name' in error && typeof error.name === 'string') {
    return error.name;
  }

  return undefined;
};

export const isTimeoutError = (error: unknown) => readErrorName(error) === 'TimeoutError';

export const isRequestAborted = (error: unknown) => {
  const name = readErrorName(error);

  return name === 'AbortError' || name === 'TimeoutError';
};
