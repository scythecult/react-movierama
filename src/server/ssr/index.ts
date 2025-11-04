import { styleText } from 'node:util';
import { Config } from '../../common/env';
import { createSsrServer } from './server';

const ssrServer = await createSsrServer();

// TODO Implement logger
ssrServer.listen(Config.ssrPort, () => {
  console.info(
    styleText(
      ['green', 'bold'],
      `Server is running on:

      PORT: ${Config.ssrUrl}
      ENV: ${Config.nodeEnv}
      MODE: ${Config.appMode}`,
    ),
  );
});
