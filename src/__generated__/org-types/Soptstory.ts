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
  CreateSoptStoryData,
  CreateSoptStoryRequest,
  GetSoptStoryListData,
  LikeSoptStoryData,
  UnlikeSoptStoryData,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Soptstory<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags SoptStory
   * @name GetSoptStoryList
   * @summary 솝트스토리 리스트 조회(정렬)
   * @request GET:/soptstory
   * @response `200` `GetSoptStoryListData` OK
   */
  getSoptStoryList = (
    query: {
      sort?: string;
      /**
       * @format int32
       * @min 1
       */
      pageNo: number;
      /**
       * @format int32
       * @min 1
       */
      limit: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetSoptStoryListData, any>({
      path: `/soptstory`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description 솝트스토리를 생성합니다.
   *
   * @tags SoptStory
   * @name CreateSoptStory
   * @summary 솝트스토리 생성
   * @request POST:/soptstory
   * @response `200` `CreateSoptStoryData` OK
   */
  createSoptStory = (
    data: CreateSoptStoryRequest,
    params: RequestParams = {},
  ) =>
    this.request<CreateSoptStoryData, any>({
      path: `/soptstory`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SoptStory
   * @name UnlikeSoptStory
   * @summary 솝트스토리 좋아요 취소하기
   * @request POST:/soptstory/{id}/unlike
   * @response `200` `UnlikeSoptStoryData` OK
   */
  unlikeSoptStory = (id: number, params: RequestParams = {}) =>
    this.request<UnlikeSoptStoryData, any>({
      path: `/soptstory/${id}/unlike`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags SoptStory
   * @name LikeSoptStory
   * @summary 솝트스토리 좋아요 누르기
   * @request POST:/soptstory/{id}/like
   * @response `200` `LikeSoptStoryData` OK
   */
  likeSoptStory = (id: number, params: RequestParams = {}) =>
    this.request<LikeSoptStoryData, any>({
      path: `/soptstory/${id}/like`,
      method: 'POST',
      ...params,
    });
}
