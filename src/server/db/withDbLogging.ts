import { toError } from '../lib/helpers/error';
import { getModuleLogger, LogModule } from '../lib/infra/logger';

const elapsedMs = (startedAt: number) => Math.round(performance.now() - startedAt);

export const withDbLogging = <T extends object>(entity: string, db: T): T =>
  new Proxy(db, {
    get(target, property, receiver) {
      const value = Reflect.get(target, property, receiver);

      if (property === 'constructor' || typeof property !== 'string' || typeof value !== 'function') {
        return value;
      }

      return (...args: unknown[]) => {
        const startedAt = performance.now();
        const log = getModuleLogger(LogModule.db);
        const fields = { entity, operation: property };

        const onSuccess = (result: unknown) => {
          log.debug({ ...fields, durationMs: elapsedMs(startedAt) }, 'Database operation completed');

          return result;
        };

        const onFailure = (error: unknown): never => {
          const err = toError(error, 'Database operation failed');

          log.error({ err, ...fields, durationMs: elapsedMs(startedAt) }, 'Database operation failed');

          throw error;
        };

        try {
          const result = value.apply(target, args);

          if (result instanceof Promise) {
            return result.then(onSuccess, onFailure);
          }

          return onSuccess(result);
        } catch (error) {
          onFailure(error);
        }
      };
    },
  });
