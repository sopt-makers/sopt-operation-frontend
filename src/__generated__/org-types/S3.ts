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

import { GetPresignedUrlData, PresignedUrlRequest } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class S3<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 클라이언트가 직접 S3에 파일을 업로드할 수 있는 서명된 URL을 발급합니다. **사용 흐름:** 1. 이 API 호출 → presignedUrl, fileUrl 수신 2. presignedUrl로 PUT 요청 (파일 바이너리 전송) 3. fileUrl을 뉴스/프로젝트 생성 API에 전달 **허용 파일 형식:** jpeg, jpg, png, gif, webp **URL 유효 시간:** 10분 **기존 API와의 차이점:** - 기존: generatePresignedUrl(fileName, path) - 서버가 Content-Type 추측 - 신규: 클라이언트가 Content-Type 직접 전달 (Lambda 환경 대응)
   *
   * @tags S3 Presigned URL
   * @name GetPresignedUrl
   * @summary S3 Presigned URL 발급
   * @request POST:/s3/presigned-url
   * @response `200` `GetPresignedUrlData` Presigned URL 발급 성공
   * @response `400` `void` 잘못된 요청 (허용되지 않는 파일 형식 등)
   */
  getPresignedUrl = (data: PresignedUrlRequest, params: RequestParams = {}) =>
    this.request<GetPresignedUrlData, void>({
      path: `/s3/presigned-url`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
