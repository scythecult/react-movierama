import { ClientConfig } from '../src/client/env';

export const enableMocks = async () => {
  if (ClientConfig.nodeEnv === 'production' || ClientConfig.isWatchMode) {
    console.info('Mocks are disabled');
    return;
  }

  const { worker } = await import('./browser');

  // worker.events.on('request:start', ({ request }) => {
  //   console.log('Outgoing:', request.method, request.url);
  // });

  return worker.start();
};
