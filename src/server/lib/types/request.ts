import type { Request } from 'express';
import type { ParamsDictionary, Query } from 'express-serve-static-core';

export interface TypedRequest<
  Body,
  QueryParams extends Query = Query,
  Params extends ParamsDictionary = ParamsDictionary,
> extends Request {
  body: Body;
  query: QueryParams;
  params: Params;
}

export interface TypedQueryRequest<QueryParams extends Query = Query> extends Request {
  query: QueryParams;
}

export interface TypedParamsRequest<Params extends ParamsDictionary = ParamsDictionary> extends Request {
  params: Params;
}
