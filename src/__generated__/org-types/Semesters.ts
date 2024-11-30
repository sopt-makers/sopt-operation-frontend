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

import { GetSemestersData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Semesters<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Semester
   * @name GetSemesters
   * @request GET:/semesters
   * @response `200` `GetSemestersData` OK
   */
  getSemesters = (
    query: {
      /** @format int32 */
      limit: number;
      /**
       * @format int32
       * @default 1
       */
      page?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetSemestersData, any>({
      path: `/semesters`,
      method: 'GET',
      query: query,
      ...params,
    });
}
