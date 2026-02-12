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

import { ScrapLinkData, ScrapLinkRequestDto } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Internal<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Playground 에서 솝티클 정보 스크래핑에 필요한 API 입니다.
   *
   * @tags Internal
   * @name ScrapLink
   * @summary 블로그 링크 정보 스크랩하기
   * @request POST:/internal/scrap
   * @response `200` `ScrapLinkData` OK
   */
  scrapLink = (data: ScrapLinkRequestDto, params: RequestParams = {}) =>
    this.request<ScrapLinkData, any>({
      path: `/internal/scrap`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
