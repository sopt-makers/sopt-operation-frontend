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

import { GetTodayVisitorData, VisitorCountUpData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Visitor<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Visitor
   * @name GetTodayVisitor
   * @summary 하루 방문자 수 조회
   * @request GET:/visitor
   * @response `200` `GetTodayVisitorData` OK
   */
  getTodayVisitor = (params: RequestParams = {}) =>
    this.request<GetTodayVisitorData, any>({
      path: `/visitor`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Visitor
   * @name VisitorCountUp
   * @summary 하루 방문자 수 증가
   * @request POST:/visitor
   * @response `200` `VisitorCountUpData` OK
   */
  visitorCountUp = (params: RequestParams = {}) =>
    this.request<VisitorCountUpData, any>({
      path: `/visitor`,
      method: 'POST',
      ...params,
    });
}
