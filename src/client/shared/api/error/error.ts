import type { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';
export type ErrorMap = Record<string, string | string[]>;

export class ServerValidationError extends Error {
  errorMap: ErrorMap;

  constructor(errorMap: ErrorMap) {
    super();
    this.errorMap = errorMap;
  }

  handleFormErrors = <TFieldValues extends FieldValues>(setError: UseFormSetError<TFieldValues>) => {
    if (!this.errorMap) {
      return;
    }

    Object.entries(this.errorMap).forEach(([key, value]) => {
      const message = Array.isArray(value) ? value[0] : value;

      if (message) {
        setError(key as FieldPath<TFieldValues>, {
          type: 'server',
          message: message,
        });
      }
    });
  };
}
