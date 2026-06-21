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

import { GetPartDetailData, GetRecruitMainPageData } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Recruit<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 지원서 메인 페이지 데이터를 조회합니다
   *
   * @tags Recruit Page
   * @name GetRecruitMainPage
   * @summary 지원서 메인 페이지 조회
   * @request GET:/recruit
   * @response `200` `GetRecruitMainPageData` OK
   */
  getRecruitMainPage = (params: RequestParams = {}) =>
    this.request<GetRecruitMainPageData, any>({
      path: `/recruit`,
      method: 'GET',
      ...params,
    });
  /**
   * @description 파트별 소개, 선호하는 인재상, 커리큘럼을 조회합니다
   *
   * @tags Recruit Page
   * @name GetPartDetail
   * @summary 지원서 파트 상세 조회
   * @request GET:/recruit/part
   * @response `200` `GetPartDetailData` OK
   */
  getPartDetail = (
    query: {
      part: 'iOS' | '기획' | '디자인' | '서버' | '안드로이드' | '웹' | '공통';
    },
    params: RequestParams = {},
  ) =>
    this.request<GetPartDetailData, any>({
      path: `/recruit/part`,
      method: 'GET',
      query: query,
      ...params,
    });
}
