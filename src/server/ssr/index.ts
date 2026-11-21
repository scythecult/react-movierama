import { StatusCodes } from 'http-status-codes';
import { Config } from '../../common/env';
import { getModuleLogger, installFatalHandlers, LogModule } from '../lib/infra/logger';
import { createSsrServer } from './server';

installFatalHandlers();

const ssrServer = await createSsrServer();

ssrServer.use('*not-found', (_, response) => {
  response.status(StatusCodes.NOT_FOUND).send('Ssr not found');
});

ssrServer.listen(Config.ssrPort, () => {
  getModuleLogger(LogModule.ssr).info(
    {
      host: Config.ssrUrl,
      env: Config.nodeEnv,
      mode: Config.appMode,
    },
    'SSR server is listening',
  );
});
