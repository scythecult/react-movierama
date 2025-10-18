export const enableMocks = async () => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const { worker } = await import('./browser');

  // worker.events.on('request:start', ({ request }) => {
  //   console.log('Outgoing:', request.method, request.url);
  // });

  return worker.start();
};
