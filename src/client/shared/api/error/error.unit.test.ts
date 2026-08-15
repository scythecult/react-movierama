import type { FieldValues, UseFormSetError } from 'react-hook-form';
import { vi } from 'vitest';
import { type ErrorMap, ServerValidationError } from './error';

describe('ServerValidationError', () => {
  let mockSetError = vi.fn() as UseFormSetError<FieldValues>;

  beforeEach(() => {
    mockSetError = vi.fn();
  });

  test('should correctly initialize errorMap via constructor', () => {
    const errorMap: ErrorMap = { username: 'Имя уже занято' };
    const error = new ServerValidationError(errorMap);

    expect(error.errorMap).toEqual(errorMap);
    expect(error).toBeInstanceOf(Error);
  });

  test('should call setError with string error', () => {
    const errorMap: ErrorMap = { email: 'Неверный формат email' };
    const error = new ServerValidationError(errorMap);

    error.handleFormErrors(mockSetError);

    expect(mockSetError).toHaveBeenCalledTimes(1);
    expect(mockSetError).toHaveBeenCalledWith('email', {
      type: 'server',
      message: 'Неверный формат email',
    });
  });

  test('should take the first error if an array of strings is passed', () => {
    const errorMap: ErrorMap = {
      password: ['Пароль слишком короткий', 'Пароль должен содержать цифры'],
    };
    const error = new ServerValidationError(errorMap);

    error.handleFormErrors(mockSetError);

    expect(mockSetError).toHaveBeenCalledTimes(1);
    expect(mockSetError).toHaveBeenCalledWith('password', {
      type: 'server',
      message: 'Пароль слишком короткий',
    });
  });

  test('should handle multiple fields simultaneously', () => {
    const errorMap: ErrorMap = {
      username: 'Обязательное поле',
      age: ['Должно быть больше 18', 'Второй элемент'],
    };
    const error = new ServerValidationError(errorMap);

    error.handleFormErrors(mockSetError);

    expect(mockSetError).toHaveBeenCalledTimes(2);
    expect(mockSetError).toHaveBeenNthCalledWith(1, 'username', {
      type: 'server',
      message: 'Обязательное поле',
    });
    expect(mockSetError).toHaveBeenNthCalledWith(2, 'age', {
      type: 'server',
      message: 'Должно быть больше 18',
    });
  });

  test('should not call setError if message is empty or array is empty', () => {
    const errorMap: ErrorMap = {
      validField: '',
      emptyArrayField: [],
    };
    const error = new ServerValidationError(errorMap);

    error.handleFormErrors(mockSetError);

    expect(mockSetError).not.toHaveBeenCalled();
  });

  test('should not throw if errorMap is null or undefined', () => {
    const error = new ServerValidationError(null as unknown as ErrorMap);

    expect(() => error.handleFormErrors(mockSetError)).not.toThrow();
    expect(mockSetError).not.toHaveBeenCalled();
  });
});
