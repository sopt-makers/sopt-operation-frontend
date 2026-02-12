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
  CreateReviewData,
  CreateReviewReq,
  GetRandomReviewsByPartData,
  GetReviewsByAuthorData,
  GetReviewsData,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Reviews<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Reviews - Query
   * @name GetReviews
   * @summary 활동 후기 목록 조회
   * @request GET:/reviews
   * @response `200` `GetReviewsData` OK
   */
  getReviews = (
    query?: {
      /**
       * 카테고리
       * @example "전체 활동"
       */
      category?: string;
      /**
       * 활동 (전체 활동일 때만)
       * @example "세미나"
       */
      activity?: string;
      /**
       * 파트
       * @example "SERVER"
       */
      part?: string;
      /**
       * 기수
       * @example 34
       */
      generation?: string;
      /**
       * 페이지 번호 (1부터 시작)
       * @default "1"
       * @example 1
       */
      pageNo?: string;
      /**
       * 페이지 크기
       * @default "10"
       * @example 10
       */
      limit?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetReviewsData, any>({
      path: `/reviews`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description 활동후기를 추가합니다. API 키 인증이 필요합니다.
   *
   * @tags Reviews - Command
   * @name CreateReview
   * @summary 활동후기 추가
   * @request POST:/reviews
   * @response `200` `CreateReviewData` OK
   */
  createReview = (data: CreateReviewReq, params: RequestParams = {}) =>
    this.request<CreateReviewData, any>({
      path: `/reviews`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reviews - Query
   * @name GetRandomReviewsByPart
   * @summary 랜덤 활동 후기 파트별로 하나씩 조회
   * @request GET:/reviews/random
   * @response `200` `GetRandomReviewsByPartData` OK
   */
  getRandomReviewsByPart = (params: RequestParams = {}) =>
    this.request<GetRandomReviewsByPartData, any>({
      path: `/reviews/random`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Reviews - Query
   * @name GetReviewsByAuthor
   * @summary Playground Internal - 유저 활동후기 데이터 조회
   * @request GET:/reviews/internal
   * @response `200` `GetReviewsByAuthorData` OK
   */
  getReviewsByAuthor = (
    query: {
      /**
       * 작성자명
       * @example "홍길동"
       */
      name: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetReviewsByAuthorData, any>({
      path: `/reviews/internal`,
      method: 'GET',
      query: query,
      ...params,
    });
}
