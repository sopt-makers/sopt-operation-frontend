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

import { GetAllProjectData, RegisterNotificationData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Notification<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Notification
   * @name RegisterNotification
   * @request POST:/notification/register
   * @response `200` `RegisterNotificationData` OK
   */
  registerNotification = (
    query: {
      /**
       * 활동 기수
       * @example 34
       */
      generation: string;
      /**
       * 이메일
       * @example "example@naver.com"
       */
      email: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<RegisterNotificationData, any>({
      path: `/notification/register`,
      method: 'POST',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Notification
   * @name GetAllProject
   * @request GET:/notification/list
   * @response `200` `GetAllProjectData` OK
   */
  getAllProject = (
    query?: {
      /**
       * 기수
       * @format int32
       */
      generation?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetAllProjectData, any>({
      path: `/notification/list`,
      method: 'GET',
      query: query,
      ...params,
    });
}
