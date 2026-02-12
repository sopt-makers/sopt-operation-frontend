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
  GetListData,
  RegisterData,
  RegisterNotificationRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Notification<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Notification
   * @name Register
   * @summary 모집 알림 신청
   * @request POST:/notification/register
   * @response `200` `RegisterData` OK
   */
  register = (data: RegisterNotificationRequest, params: RequestParams = {}) =>
    this.request<RegisterData, any>({
      path: `/notification/register`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Notification
   * @name GetList
   * @summary 모집 알림 목록 조회
   * @request GET:/notification/list
   * @response `200` `GetListData` OK
   */
  getList = (
    query: {
      /** @format int32 */
      generation: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetListData, any>({
      path: `/notification/list`,
      method: 'GET',
      query: query,
      ...params,
    });
}
