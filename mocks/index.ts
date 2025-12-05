import { Config } from '../src/common/env';

export const enableMocks = async () => {
  if (Config.nodeEnv === 'production' || Config.appMode === 'watch') {
    return;
  }

  const { worker } = await import('./browser');
  // We could init here worker events listeners.

  return worker.start({
    onUnhandledRequest(request, print) {
      if (
        request.url.includes('kinomax') ||
        request.url.includes('static') ||
        request.url.includes('styles') ||
        request.url.includes('client')
      ) {
        return;
      }

      // For other unhandled requests, print a warning
      print.warning();
    },
  });
};
