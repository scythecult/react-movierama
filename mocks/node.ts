import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import { mockServerOptions } from './helpers/unhandled';

export const serverMocks = setupServer(...handlers);

export const listenMockServer = () => {
  serverMocks.listen(mockServerOptions);
};
