export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An error occured';
};

export const toError = (reason: unknown, fallback: string) => {
  if (reason instanceof Error) {
    return reason;
  }

  if (typeof reason === 'string' && reason) {
    return new Error(reason);
  }

  return new Error(fallback);
};
