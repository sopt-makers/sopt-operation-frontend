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

import { GetAllProjectData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Projects<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Project
   * @name GetAllProject
   * @request GET:/projects
   * @response `200` `GetAllProjectData` OK
   */
  getAllProject = (
    query?: {
      /** 프로젝트 타입 */
      filter?:
        | 'APPJAM'
        | 'SOPKATHON'
        | 'SOPTERM'
        | 'STUDY'
        | 'JOINTSEMINAR'
        | 'ETC';
      /** 서비스 플랫폼 */
      platform?: 'WEB' | 'APP';
      /**
       * 페이지
       * @format int32
       * @min 1
       * @example 1
       */
      pageNo?: number;
      /**
       * 페이지별 데이터 개수
       * @format int32
       * @min 1
       * @example 10
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetAllProjectData, any>({
      path: `/projects`,
      method: 'GET',
      query: query,
      ...params,
    });
}
