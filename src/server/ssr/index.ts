import { StatusCodes } from 'http-status-codes';
import { styleText } from 'node:util';
import { Config } from '../../common/env';
import { createSsrServer } from './server';

const ssrServer = await createSsrServer();

ssrServer.use('*not-found', (_, response) => {
  response.status(StatusCodes.NOT_FOUND).send('Ssr not found');
});

// TODO Implement logger
ssrServer.listen(Config.ssrPort, () => {
  console.info(
    styleText(
      ['green', 'bold'],
      `Server is running on:

      HOST: ${Config.ssrUrl}
      ENV: ${Config.nodeEnv}
      MODE: ${Config.appMode}`,
    ),
  );
});
