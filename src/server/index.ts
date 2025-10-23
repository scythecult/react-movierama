// import { serverMocks } from '../../mocks/node';
import { StatusCodes } from 'http-status-codes';
import { AppRoute } from '../common/constants/routes';
import { ServerConfig } from './env';
import { createServer } from './server';
import { canvasSize, seatsData, staticSeatTypes } from './service/serverMockData';

// SSR Implementation should be here
// serverMocks.listen();
const server = createServer();

server.get(AppRoute.HALLPLAN, (_, response) => {
  console.info('real response');

  response.status(StatusCodes.OK).json({
    data: {
      canvas: canvasSize,
      seats: seatsData,
      seatTypes: staticSeatTypes,
    },
  });
});

server.listen(ServerConfig.ssrPort, () => {
  console.info(`Server is running on ${ServerConfig.ssrUrl}`);
});
