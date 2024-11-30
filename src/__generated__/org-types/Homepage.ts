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

import { GetAboutPageData, GetData, GetMainPageData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Homepage<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 메인 페이지 데이터를 조회합니다
   *
   * @tags Homepage
   * @name GetMainPage
   * @summary 메인 페이지 조회
   * @request GET:/homepage
   * @response `200` `GetMainPageData` OK
   */
  getMainPage = (params: RequestParams = {}) =>
    this.request<GetMainPageData, any>({
      path: `/homepage`,
      method: 'GET',
      ...params,
    });
  /**
   * @description 지원하기 페이지 데이터를 조회합니다
   *
   * @tags Homepage
   * @name Get
   * @summary 지원하기 페이지 조회
   * @request GET:/homepage/recruit
   * @response `200` `GetData` OK
   */
  get = (params: RequestParams = {}) =>
    this.request<GetData, any>({
      path: `/homepage/recruit`,
      method: 'GET',
      ...params,
    });
  /**
   * @description 소개 페이지 데이터를 조회합니다
   *
   * @tags Homepage
   * @name GetAboutPage
   * @summary 소개 페이지 조회
   * @request GET:/homepage/about
   * @response `200` `GetAboutPageData` OK
   */
  getAboutPage = (params: RequestParams = {}) =>
    this.request<GetAboutPageData, any>({
      path: `/homepage/about`,
      method: 'GET',
      ...params,
    });
}
