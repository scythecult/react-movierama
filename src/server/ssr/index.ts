// import { serverMocks } from '../../mocks/node';
import { Config } from '../../common/env';
import { createSsrServer } from './server';

// serverMocks.listen();
const ssrServer = await createSsrServer();

ssrServer.listen(Config.ssrPort, () => {
  console.info(`Server is running on: ${Config.ssrUrl}, mode: ${Config.nodeEnv}`);
});
