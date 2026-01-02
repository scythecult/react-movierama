import { StatusCodes } from 'http-status-codes';
import { styleText } from 'node:util';
import { Config } from '../../common/env';
import { createApiServer } from './server';

const apiServer = await createApiServer();

apiServer.use('*not-found', (_, response) => {
  response.status(StatusCodes.NOT_FOUND).json({ message: 'Api Not found' });
});

apiServer.listen(Config.apiPort, () => {
  console.info(
    styleText(
      ['red', 'bold'],
      `Api server is running on:

      HOST: ${Config.apiUrl}
      ENV: ${Config.nodeEnv}`,
    ),
  );
});
