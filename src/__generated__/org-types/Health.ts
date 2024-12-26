/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { HealthCheckData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Health<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags HealthCheck
   * @name HealthCheck
   * @request GET:/health
   * @response `200` `HealthCheckData` OK
   */
  healthCheck = (params: RequestParams = {}) =>
    this.request<HealthCheckData, any>({
      path: `/health`,
      method: 'GET',
      ...params,
    });
}
