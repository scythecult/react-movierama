import { StatusCodes } from 'http-status-codes';
import { Config } from '../../common/env';
import { getModuleLogger, installFatalHandlers, LogModule } from '../lib/infra/logger';
import { createApiServer } from './server';

installFatalHandlers();

const apiServer = await createApiServer();

apiServer.use('*not-found', (_, response) => {
  response.status(StatusCodes.NOT_FOUND).json({ message: 'Api Not found' });
});

apiServer.listen(Config.apiPort, () => {
  getModuleLogger(LogModule.api).info(
    {
      host: Config.apiUrl,
      env: Config.nodeEnv,
      mode: Config.appMode,
    },
    'API server is listening',
  );
});
