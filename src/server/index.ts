import { serverMocks } from '../../mocks/node';
import { SSR_PORT, SSR_URL } from '../common/url';
import { createServer } from './server';

// SSR Implementation should be here
serverMocks.listen();
const server = createServer();

server.listen(SSR_PORT, () => {
  console.info(`Server is running on ${SSR_URL}`);
});
