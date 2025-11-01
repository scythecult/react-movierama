import { Config } from '../src/common/env';

export const enableMocks = async () => {
  if (Config.nodeEnv === 'production' || Config.isWatchMode) {
    return;
  }

  const { worker } = await import('./browser');
  // We could init here worker events listeners.

  return worker.start();
};
