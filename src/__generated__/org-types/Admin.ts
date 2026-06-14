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
  AddAboutConfirmData,
  AddAboutData,
  AddAdminAboutRequestDto,
  AddAdminCommonRequestDto,
  AddAdminConfirmRequestDto,
  AddAdminHomeRequestDto,
  AddAdminNewsRequestDto,
  AddAdminNewsV2RequestDto,
  AddAdminRecruitRequestDto,
  AddCommonConfirmData,
  AddCommonData,
  AddHomeConfirmData,
  AddHomeData,
  AddMainNewsData,
  AddMainNewsV2Data,
  AddRecruitConfirmData,
  AddRecruitData,
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
   * @description 모집 헤더 이미지 Presigned URL을 발급하고 파트별 소개/커리큘럼/FAQ를 캐시에 저장합니다. 응답의 Presigned URL로 이미지 업로드 후 2단계를 호출하세요.
   *
   * @tags Admin
   * @name AddRecruit
   * @summary 모집안내 탭 배포
   * @request POST:/admin/recruit
   * @secure
   * @response `200` `AddRecruitData` OK
   */
  addRecruit = (data: AddAdminRecruitRequestDto, params: RequestParams = {}) =>
    this.request<AddRecruitData, any>({
      path: `/admin/recruit`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 이미지 업로드 완료 후 캐시 데이터를 DB에 반영합니다. 공통 탭 배포 이후에 호출해야 합니다.
   *
   * @tags Admin
   * @name AddRecruitConfirm
   * @summary 모집안내 탭 배포 확정
   * @request POST:/admin/recruit/confirm
   * @secure
   * @response `200` `AddRecruitConfirmData` OK
   */
  addRecruitConfirm = (
    data: AddAdminConfirmRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<AddRecruitConfirmData, any>({
      path: `/admin/recruit/confirm`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 최신소식을 추가합니다
   *
   * @tags Admin - News
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
   * @description 람다 전용
   *
   * @tags Admin - News
   * @name AddMainNewsV2
   * @summary 최신소식 추가 (Presigned URL)
   * @request POST:/admin/news/v2
   * @secure
   * @response `200` `AddMainNewsV2Data` OK
   */
  addMainNewsV2 = (
    data: AddAdminNewsV2RequestDto,
    params: RequestParams = {},
  ) =>
    this.request<AddMainNewsV2Data, any>({
      path: `/admin/news/v2`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 최신소식을 삭제합니다
   *
   * @tags Admin - News
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
   * @description 홈 헤더 이미지 Presigned URL을 발급하고 리뷰/최신소식을 캐시에 저장합니다. 응답의 Presigned URL로 이미지 업로드 후 2단계를 호출하세요.
   *
   * @tags Admin
   * @name AddHome
   * @summary 홈 탭 배포
   * @request POST:/admin/home
   * @secure
   * @response `200` `AddHomeData` OK
   */
  addHome = (data: AddAdminHomeRequestDto, params: RequestParams = {}) =>
    this.request<AddHomeData, any>({
      path: `/admin/home`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 이미지 업로드 완료 후 캐시 데이터를 DB에 반영합니다. 공통 탭 배포 이후에 호출해야 합니다.
   *
   * @tags Admin
   * @name AddHomeConfirm
   * @summary 홈 탭 배포 확정
   * @request POST:/admin/home/confirm
   * @secure
   * @response `200` `AddHomeConfirmData` OK
   */
  addHomeConfirm = (
    data: AddAdminConfirmRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<AddHomeConfirmData, any>({
      path: `/admin/home/confirm`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 기수 정보, 브랜딩 컬러, 메인 버튼, 모집 일정을 캐시에 저장합니다. 이미지가 없으므로 응답 즉시 2단계(confirm)를 호출해도 됩니다.
   *
   * @tags Admin
   * @name AddCommon
   * @summary 공통 탭 배포
   * @request POST:/admin/common
   * @secure
   * @response `200` `AddCommonData` OK
   */
  addCommon = (data: AddAdminCommonRequestDto, params: RequestParams = {}) =>
    this.request<AddCommonData, any>({
      path: `/admin/common`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 캐시에 저장된 공통 탭 데이터를 DB에 반영합니다. 공통 탭은 반드시 다른 탭보다 먼저 배포해야 합니다.
   *
   * @tags Admin
   * @name AddCommonConfirm
   * @summary 공통 탭 배포 확정
   * @request POST:/admin/common/confirm
   * @secure
   * @response `200` `AddCommonConfirmData` OK
   */
  addCommonConfirm = (
    data: AddAdminConfirmRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<AddCommonConfirmData, any>({
      path: `/admin/common/confirm`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 소개 헤더/핵심가치/임원진 이미지 Presigned URL을 발급하고 전체 일정을 캐시에 저장합니다. 응답의 Presigned URL로 이미지 업로드 후 2단계를 호출하세요.
   *
   * @tags Admin
   * @name AddAbout
   * @summary 소개 탭 배포
   * @request POST:/admin/about
   * @secure
   * @response `200` `AddAboutData` OK
   */
  addAbout = (data: AddAdminAboutRequestDto, params: RequestParams = {}) =>
    this.request<AddAboutData, any>({
      path: `/admin/about`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 이미지 업로드 완료 후 캐시 데이터를 DB에 반영합니다. 공통 탭 배포 이후에 호출해야 합니다.
   *
   * @tags Admin
   * @name AddAboutConfirm
   * @summary 소개 탭 배포 확정
   * @request POST:/admin/about/confirm
   * @secure
   * @response `200` `AddAboutConfirmData` OK
   */
  addAboutConfirm = (
    data: AddAdminConfirmRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<AddAboutConfirmData, any>({
      path: `/admin/about/confirm`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
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
   * @description 최신소식을 조회합니다
   *
   * @tags Admin - News
   * @name GetMainNews
   * @summary 최신소식 조회
   * @request GET:/admin/news/news
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
      path: `/admin/news/news`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
}
