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

import {
  HealthCheckData,
  TestSentryError2Data,
  TestSentryError3Data,
  TestSentryErrorData,
} from './data-contracts';
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
  /**
   * No description
   *
   * @tags HealthCheck
   * @name TestSentryError
   * @request GET:/health/sentryerror
   * @response `200` `TestSentryErrorData` OK
   */
  testSentryError = (params: RequestParams = {}) =>
    this.request<TestSentryErrorData, any>({
      path: `/health/sentryerror`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags HealthCheck
   * @name TestSentryError3
   * @request GET:/health/sentryerror3
   * @response `200` `TestSentryError3Data` OK
   */
  testSentryError3 = (params: RequestParams = {}) =>
    this.request<TestSentryError3Data, any>({
      path: `/health/sentryerror3`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags HealthCheck
   * @name TestSentryError2
   * @request GET:/health/sentryerror2
   * @response `200` `TestSentryError2Data` OK
   */
  testSentryError2 = (params: RequestParams = {}) =>
    this.request<TestSentryError2Data, any>({
      path: `/health/sentryerror2`,
      method: 'GET',
      ...params,
    });
}
