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

import { GetProjectData, GetProjectsData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Projects<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Project
   * @name GetProjects
   * @summary 프로젝트 정보 전부 가져오기
   * @request GET:/projects
   * @response `200` `GetProjectsData` OK
   */
  getProjects = (
    query?: {
      /** 필터링 키워드 */
      filter?:
        | 'APPJAM'
        | 'SOPKATHON'
        | 'SOPTERM'
        | 'STUDY'
        | 'JOINTSEMINAR'
        | 'ETC';
      /** 웹/앱 필터링 */
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
    this.request<GetProjectsData, any>({
      path: `/projects`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Project
   * @name GetProject
   * @summary 특정 프로젝트 정보 가져오기
   * @request GET:/projects/{projectId}
   * @response `200` `GetProjectData` OK
   */
  getProject = (projectId: number, params: RequestParams = {}) =>
    this.request<GetProjectData, any>({
      path: `/projects/${projectId}`,
      method: 'GET',
      ...params,
    });
}
