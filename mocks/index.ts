import { Config } from '../src/common/env';
import { mockServerOptions } from './helpers/unhandled';

export const enableMocks = async () => {
  if (Config.nodeEnv === 'production' || Config.appMode === 'watch') {
    return;
  }

  const { worker } = await import('./browser');

  return worker.start(mockServerOptions);
};
