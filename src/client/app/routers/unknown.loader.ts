import { StatusCodes } from 'http-status-codes';
import { data } from 'react-router';

export const unknownPageLoader = () => data(null, { status: StatusCodes.NOT_FOUND });
