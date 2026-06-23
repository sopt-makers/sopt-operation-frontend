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
  AddAdminReviewRequestDto,
  CreateReview1Data,
  EditAdminReviewRequestDto,
  EditReviewData,
  GetReviews1Data,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class HomepageReviews<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description ID 오름차순으로 전체 목록을 반환합니다
   *
   * @tags Admin - HomepageReview
   * @name GetReviews1
   * @summary 홈페이지 리뷰 목록 조회
   * @request GET:/homepage-reviews
   * @response `200` `GetReviews1Data` OK
   */
  getReviews1 = (params: RequestParams = {}) =>
    this.request<GetReviews1Data, any>({
      path: `/homepage-reviews`,
      method: 'GET',
      ...params,
    });
  /**
   * @description 제목 최대 10자, 내용 최대 200자
   *
   * @tags Admin - HomepageReview
   * @name CreateReview1
   * @summary 홈페이지 리뷰 추가
   * @request POST:/homepage-reviews
   * @secure
   * @response `200` `CreateReview1Data` OK
   */
  createReview1 = (
    data: AddAdminReviewRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<CreateReview1Data, any>({
      path: `/homepage-reviews`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 제목 최대 10자, 내용 최대 200자
   *
   * @tags Admin - HomepageReview
   * @name EditReview
   * @summary 홈페이지 리뷰 수정
   * @request PATCH:/homepage-reviews/{id}
   * @secure
   * @response `200` `EditReviewData` OK
   */
  editReview = (
    id: number,
    data: EditAdminReviewRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<EditReviewData, any>({
      path: `/homepage-reviews/${id}`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
