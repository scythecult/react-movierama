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

// TODO write tests
// Checkout all project and continue to implement auth
