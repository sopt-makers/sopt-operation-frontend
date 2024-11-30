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
  AddAdminConfirmRequestDto,
  AddAdminNewsRequestDto,
  AddAdminRequestDto,
  AddMainConfirmData,
  AddMainData,
  AddMainNewsData,
  DeleteAdminNewsRequestDto,
  DeleteMainNewsData,
  GetMainData,
  GetMainNewsData,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Admin<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 어드민 메인 데이터를 조회합니다
   *
   * @tags Admin
   * @name GetMain
   * @summary 어드민 메인 데이터 조회
   * @request GET:/admin
   * @secure
   * @response `200` `GetMainData` OK
   */
  getMain = (
    query: {
      /**
       * 기수
       * @example 35
       */
      generation: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetMainData, any>({
      path: `/admin`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 어드민 메인 데이터를 배포합니다
   *
   * @tags Admin
   * @name AddMain
   * @summary 어드민 메인 데이터 배포
   * @request POST:/admin
   * @secure
   * @response `200` `AddMainData` OK
   */
  addMain = (data: AddAdminRequestDto, params: RequestParams = {}) =>
    this.request<AddMainData, any>({
      path: `/admin`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 최신소식을 조회합니다
   *
   * @tags Admin
   * @name GetMainNews
   * @summary 최신소식 조회
   * @request GET:/admin/news
   * @secure
   * @response `200` `GetMainNewsData` OK
   */
  getMainNews = (
    query: {
      /** 최신소식 ID */
      id: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetMainNewsData, any>({
      path: `/admin/news`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 최신소식을 추가합니다
   *
   * @tags Admin
   * @name AddMainNews
   * @summary 최신소식 추가
   * @request POST:/admin/news
   * @secure
   * @response `200` `AddMainNewsData` OK
   */
  addMainNews = (data: AddAdminNewsRequestDto, params: RequestParams = {}) =>
    this.request<AddMainNewsData, any>({
      path: `/admin/news`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description 최신소식을 삭제합니다
   *
   * @tags Admin
   * @name DeleteMainNews
   * @summary 최신소식 삭제
   * @request POST:/admin/news/delete
   * @secure
   * @response `200` `DeleteMainNewsData` OK
   */
  deleteMainNews = (
    data: DeleteAdminNewsRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<DeleteMainNewsData, any>({
      path: `/admin/news/delete`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 어드민 메인 데이터 배포를 확인합니다
   *
   * @tags Admin
   * @name AddMainConfirm
   * @summary 어드민 메인 데이터 배포 확인
   * @request POST:/admin/confirm
   * @secure
   * @response `200` `AddMainConfirmData` OK
   */
  addMainConfirm = (
    data: AddAdminConfirmRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<AddMainConfirmData, any>({
      path: `/admin/confirm`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
