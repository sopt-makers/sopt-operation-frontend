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

export interface VisitorCountUpResponseDto {
  /**
   * 성공 여부
   * @example "Success"
   */
  status?: string;
}

export interface CreateSoptStoryRequest {
  /**
   * @minLength 0
   * @maxLength 500
   */
  link: string;
}

export interface CreateSoptStoryResponse {
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  soptStoryUrl?: string;
}

export interface LikeSoptStoryResponse {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  soptStoryId?: number;
  ip?: string;
}

/** Presigned URL 발급 요청 (Lambda 환경용) */
export interface PresignedUrlRequest {
  /**
   * 업로드할 파일명
   * @example "banner-image.jpg"
   */
  fileName: string;
  /**
   * 파일의 Content-Type (클라이언트에서 전달)
   * @pattern ^image/(jpeg|jpg|png|gif|webp)$
   * @example "image/jpeg"
   */
  contentType: string;
  /**
   * 저장할 디렉토리 (선택, 기본값: 빈 문자열)
   * @example "news/"
   */
  directory?: string;
}

/** Presigned URL 발급 응답 (Lambda 환경용) */
export interface PresignedUrlResponse {
  /**
   * S3 업로드용 Presigned URL (PUT 요청에 사용, 10분간 유효)
   * @example "https://sopt.org.s3.ap-northeast-2.amazonaws.com/develop/news/uuid-image.jpg?X-Amz-Algorithm=..."
   */
  presignedUrl?: string;
  /**
   * 업로드 완료 후 파일 접근 URL
   * @example "https://s3.ap-northeast-2.amazonaws.com/sopt.org/develop/news/uuid-image.jpg"
   */
  fileUrl?: string;
  /**
   * Presigned URL 만료 시간 (초)
   * @format int64
   * @example 600
   */
  expiresIn?: number;
  /**
   * 저장된 파일 키 (S3 객체 키)
   * @example "develop/news/550e8400-e29b-41d4-a716-446655440000_image.jpg"
   */
  fileKey?: string;
}

/** 리뷰 생성 요청 */
export interface CreateReviewReq {
  /**
   * 기수
   * @format int32
   * @example 34
   */
  generation: number;
  /**
   * 파트
   * @example "SERVER"
   */
  part: 'iOS' | '기획' | '디자인' | '서버' | '안드로이드' | '웹' | '공통';
  /**
   * 메인 카테고리
   * @example "전체 활동"
   */
  mainCategory: string;
  /**
   * 세부 활동 목록 (전체 활동일 때만)
   * @example ["세미나","프로젝트"]
   */
  subActivities?: string[];
  /**
   * 세부 리크루팅 (서류/면접일 때만)
   * @example "서류"
   */
  subRecruiting?: string;
  /**
   * 작성자명
   * @example "홍길동"
   */
  author: string;
  /**
   * 작성자 프로필 이미지 URL
   * @example "https://example.com/profile.jpg"
   */
  authorProfileImageUrl?: string;
  /**
   * 리뷰 URL (링크)
   * @example "https://medium.com/@sopt/review-article"
   */
  link: string;
}

/** 모집 알림 신청 요청 */
export interface RegisterNotificationRequest {
  /**
   * 이메일
   * @example "example@sopt.org"
   */
  email: string;
  /**
   * 기수
   * @format int32
   * @example 35
   */
  generation: number;
}

export interface RegisterNotificationResponse {
  /** @format int64 */
  id?: number;
  email?: string;
  /** @format int32 */
  generation?: number;
  /** @format date-time */
  createdAt?: string;
}

/** 블로그 링크 정보 스크랩 요청 */
export interface ScrapLinkRequestDto {
  /** 블로그 주소 */
  link: string;
}

/** 블로그 스크랩 정보 응답 */
export interface ScrapLinkResponseDto {
  /** 블로그 스크랩 썸네일 이미지 */
  thumbnailUrl: string;
  /** 블로그 스크랩 제목 */
  title: string;
  /** 블로그 스크랩 설명 */
  description: string;
  /** 블로그 스크랩 URL */
  url: string;
}

/** 브랜딩 컬러 */
export interface AddAdminBrandingColorRequestDto {
  /**
   * 메인 컬러
   * @pattern ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
   * @example "FF0000"
   */
  main: string;
  /**
   * 로우 톤 컬러
   * @pattern ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
   * @example "CC0000"
   */
  low: string;
  /**
   * 하이 톤 컬러
   * @pattern ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
   * @example "FF3333"
   */
  high: string;
  /**
   * 포인트 컬러
   * @pattern ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
   * @example "FF9999"
   */
  point: string;
}

/** 핵심 가치 */
export interface AddAdminCoreValueRequestDto {
  /**
   * 핵심 가치
   * @example "용기"
   */
  value: string;
  /**
   * 핵심 가치 설명
   * @example "새로운 도전을 위해 과감히 용기내는 사람"
   */
  description: string;
  /**
   * 핵심 가치 이미지 파일명
   * @example "image.png"
   */
  imageFileName: string;
}

/** 소개글 정보 */
export interface AddAdminIntroductionRequestDto {
  /**
   * 내용
   * @example "Android 앱 개발"
   */
  content: string;
  /**
   * 우대사항
   * @example "Kotlin 개발 경험"
   */
  preference: string;
}

/** 메인 버튼 스타일 */
export interface AddAdminMainButtonRequestDto {
  /**
   * 버튼 텍스트
   * @example "지원하기"
   */
  text: string;
  /**
   * 주요 컬러
   * @pattern ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
   * @example "#FF0000"
   */
  keyColor: string;
  /**
   * 보조 컬러
   * @pattern ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
   * @example "#CC0000"
   */
  subColor: string;
}

/** 멤버 정보 */
export interface AddAdminMemberRequestDto {
  /**
   * 역할
   * @example "회장"
   */
  role: string;
  /**
   * 이름
   * @example "홍길동"
   */
  name: string;
  /**
   * 소속
   * @example "SOPT"
   */
  affiliation: string;
  /**
   * 한줄 소개
   * @example "안녕하세요!"
   */
  introduction: string;
  /** SNS 링크 정보 */
  sns: AddAdminSnsLinksRequestDto;
  /**
   * 프로필 이미지 파일명
   * @example "image.png"
   */
  profileImageFileName: string;
}

/** 파트별 커리큘럼 */
export interface AddAdminPartCurriculumRequestDto {
  /**
   * 파트명
   * @example "안드로이드"
   */
  part: string;
  /** 주차별 커리큘럼 (배열 순서 = 주차 순서) */
  curriculums: string[];
}

/** 파트 소개 */
export interface AddAdminPartIntroductionRequestDto {
  /**
   * 파트명
   * @example "안드로이드"
   */
  part: string;
  /**
   * 파트 설명
   * @example "Android 앱 개발"
   */
  description: string;
}

/** 질문과 답변 */
export interface AddAdminQuestionRequestDto {
  /**
   * 질문
   * @example "몇명 뽑나요?"
   */
  question: string;
  /**
   * 답변
   * @example "10명 뽑아요."
   */
  answer: string;
}

/** 모집 파트 커리큘럼 */
export interface AddAdminRecruitPartCurriculumRequestDto {
  /**
   * 파트명
   * @example "안드로이드"
   */
  part: string;
  /** 소개글 정보 */
  introduction: AddAdminIntroductionRequestDto;
}

/** 모집 질문 */
export interface AddAdminRecruitQuestionRequestDto {
  /**
   * 파트명
   * @example "안드로이드"
   */
  part: string;
  /** 질문 리스트 */
  questions: AddAdminQuestionRequestDto[];
}

/** 모집 일정 */
export interface AddAdminRecruitScheduleRequestDto {
  /**
   * 타입
   * @pattern ^(OB|YB)$
   * @example "OB"
   */
  type: 'OB' | 'YB';
  /** 상세 일정 */
  schedule: AddAdminScheduleRequestDto;
}

/** 어드민 배포하기 */
export interface AddAdminRequestDto {
  /**
   * 기수
   * @format int32
   * @example 34
   */
  generation: number;
  /**
   * 기수명
   * @example "SOPT"
   */
  name: string;
  recruitSchedule?: AddAdminRecruitScheduleRequestDto[];
  /** 브랜딩 컬러 */
  brandingColor?: AddAdminBrandingColorRequestDto;
  /** 메인 버튼 스타일 */
  mainButton?: AddAdminMainButtonRequestDto;
  partIntroduction?: AddAdminPartIntroductionRequestDto[];
  /**
   * 헤더 이미지 파일명
   * @example "header.png"
   */
  headerImageFileName: string;
  coreValue?: AddAdminCoreValueRequestDto[];
  partCurriculum?: AddAdminPartCurriculumRequestDto[];
  member?: AddAdminMemberRequestDto[];
  /**
   * 지원하기 헤더 이미지 파일명
   * @example "recruit_header.png"
   */
  recruitHeaderImageFileName: string;
  recruitPartCurriculum?: AddAdminRecruitPartCurriculumRequestDto[];
  recruitQuestion?: AddAdminRecruitQuestionRequestDto[];
}

/** 상세 일정 */
export interface AddAdminScheduleRequestDto {
  /**
   * 지원 시작 시간
   * @example "2024-01-01T09:00:00.000Z"
   */
  applicationStartTime: string;
  /**
   * 지원 종료 시간
   * @example "2024-01-31T18:00:00.000Z"
   */
  applicationEndTime: string;
  /**
   * 지원 결과 발표 시간
   * @example "2024-02-01T12:00:00.000Z"
   */
  applicationResultTime: string;
  /**
   * 면접 시작 시간
   * @example "2024-02-05T09:00:00.000Z"
   */
  interviewStartTime: string;
  /**
   * 면접 종료 시간
   * @example "2024-02-05T18:00:00.000Z"
   */
  interviewEndTime: string;
  /**
   * 최종 결과 발표 시간
   * @example "2024-02-10T12:00:00.000Z"
   */
  finalResultTime: string;
}

/** SNS 링크 정보 */
export interface AddAdminSnsLinksRequestDto {
  /**
   * 이메일
   * @example "example@sopt.org"
   */
  email?: string;
  /**
   * 링크드인 URL
   * @pattern ^https?://.*
   * @example "https://www.linkedin.com/in/example"
   */
  linkedin?: string;
  /**
   * 깃허브 URL
   * @pattern ^https?://.*
   * @example "https://github.com/example"
   */
  github?: string;
  /**
   * 비핸스 URL
   * @pattern ^https?://.*
   * @example "https://www.behance.net/example"
   */
  behance?: string;
}

/** 핵심가치 이미지 S3 PresigneUrl 정보 */
export interface AddAdminCoreValueResponseRecordDto {
  /**
   * 핵심 가치
   * @example "용기"
   */
  value: string;
  /** 핵심가치 이미지 PresgiendUrl */
  image: string;
}

/** 멤버 프로필 이미지 S3 PresigneUrl 정보 */
export interface AddAdminMemberResponseRecordDto {
  /**
   * 역할
   * @example "회장"
   */
  role: string;
  /**
   * 이름
   * @example "홍길동"
   */
  name: string;
  /** 프로필 이미지 PresgiendUrl */
  profileImage: string;
}

/** 어드민 메인정보 추가 */
export interface AddAdminResponseDto {
  /**
   * 기수
   * @format int32
   * @example 34
   */
  generation: number;
  /**
   * 헤더 이미지 S3 PresignedUrl
   * @example "https://image.url"
   */
  headerImage: string;
  /** 핵심가치 이미지 S3 PresigneUrl 정보 */
  coreValues: AddAdminCoreValueResponseRecordDto[];
  /** 멤버 프로필 이미지 S3 PresigneUrl 정보 */
  members: AddAdminMemberResponseRecordDto[];
  /**
   * 지원하기 헤더 이미지 S3 PresignedUrl
   * @example "https://image.url"
   */
  recruitHeaderImage: string;
}

/** 최신소식 추가하기 */
export interface AddAdminNewsRequestDto {
  /** @format binary */
  image: File;
  /**
   * 제목
   * @example "MIND 23"
   */
  title: string;
  /**
   * 링크
   * @example "https://disquiet.io/product/mind-23-%EC%98%A4%EB%8A%98%EB%8F%84-%EB%A9%88%EC%B6%94%EC%A7%80-%EC%95%8A%EB%8A%94-it%EC%9D%B8%EB%93%A4"
   */
  link: string;
}

/** 최신 소식 추가 */
export interface AddAdminNewsResponseDto {
  /**
   * 성공 메세지
   * @example "success"
   */
  message: string;
}

/** 최신소식 추가하기 (Presigned URL 방식) */
export interface AddAdminNewsV2RequestDto {
  /**
   * S3에 업로드된 이미지 URL (Presigned URL로 업로드 후 받은 fileUrl)
   * @example "https://s3.ap-northeast-2.amazonaws.com/sopt.org/develop/news/uuid_image.jpg"
   */
  imageUrl: string;
  /**
   * 제목
   * @example "SOPT 35기 모집 안내"
   */
  title: string;
  /**
   * 링크
   * @example "https://sopt.org/recruit"
   */
  link: string;
}

/** 최신소식 삭제하기 */
export interface DeleteAdminNewsRequestDto {
  /**
   * 최신소식 ID
   * @format int32
   */
  id: number;
}

/** 최신소식 삭제 */
export interface DeleteAdminNewsResponseDto {
  /**
   * 성공 메세지
   * @example "success"
   */
  message: string;
}

/** 어드민 배포 확인 */
export interface AddAdminConfirmRequestDto {
  /**
   * 기수
   * @format int32
   * @example 34
   */
  generation: number;
}

/** 어드민 메인정보 파일 업로드 확인 */
export interface AddAdminConfirmResponseDto {
  /**
   * 성공 메세지
   * @example "success"
   */
  message: string;
}

export interface GetTodayVisitorResponseDto {
  /**
   * 오늘 하루 방문자 수
   * @format int32
   * @example 2024
   */
  count?: number;
}

export interface PaginatedSoptStoryResponse {
  content?: SoptStoryResponse[];
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  currentPage?: number;
  /** @format int32 */
  totalPages?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export interface SoptStoryResponse {
  /** @format int64 */
  id?: number;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  url?: string;
  /** @format date-time */
  uploadedAt?: string;
  /** @format int32 */
  likeCount?: number;
  isLikedByUser?: boolean;
}

/** 페이지네이션 응답 */
export interface PaginateResponseDto {
  /**
   * item을 몇개까지 가져올지에 대한 카운트
   * @format int32
   */
  limit: number;
  /**
   * 총 data 들의 갯수
   * @format int32
   */
  totalCount: number;
  /**
   * 총 페이지 카운트
   * @format int32
   */
  totalPage: number;
  /**
   * 현재 페이지
   * @format int32
   */
  currentPage: number;
  data?: ReviewRes[];
  /** 다음 페이지가 있는지 여부를 나타냄. */
  hasNextPage: boolean;
  /** 이전 페이지가 있는지 여부를 나타냄. */
  hasPrevPage: boolean;
}

/** 리뷰 응답 */
export interface ReviewRes {
  /**
   * 리뷰 ID
   * @format int64
   */
  id?: number;
  /** 제목 */
  title?: string;
  /** 작성자 */
  author?: string;
  /** 작성자 프로필 이미지 URL */
  authorProfileImageUrl?: string;
  /**
   * 기수
   * @format int32
   */
  generation?: number;
  /** 설명 */
  description?: string;
  /** 파트 */
  partType?: 'iOS' | '기획' | '디자인' | '서버' | '안드로이드' | '웹' | '공통';
  /** 카테고리 */
  category?: string;
  /** 세부 주제 */
  subject?: string[];
  /** 썸네일 URL */
  thumbnailUrl?: string;
  /** 플랫폼 */
  platform?: string;
  /** 리뷰 URL */
  url?: string;
}

/** 작성자별 리뷰 목록 응답 */
export interface ReviewsByAuthorRes {
  /**
   * 리뷰 총 개수
   * @format int32
   */
  reviewCount?: number;
  /** 리뷰 목록 */
  reviews?: ReviewRes[];
}

/** 프로젝트의 카테고리 */
export interface Category {
  project:
    | 'APPJAM'
    | 'SOPKATHON'
    | 'SOPTERM'
    | 'STUDY'
    | 'JOINTSEMINAR'
    | 'ETC';
}

/** 프로젝트 링크 */
export interface Link {
  /**
   * 웹사이트, 구글 플레이스토어, 앱스토어, Github, 발표영상 등 프로젝트에 관련된 링크의 종류
   * @example "website"
   */
  title:
    | 'website'
    | 'googlePlay'
    | 'appStore'
    | 'github'
    | 'media'
    | 'instagram';
  /**
   * 링크의 url 주소
   * @example "https://example.com"
   */
  url: string;
}

/** 프로젝트 팀원 */
export interface Member {
  /** 프로젝트 팀원 이름 */
  name: string;
  /** 프로젝트 팀원의 역할 */
  role:
    | 'Team Leader'
    | 'Main PM'
    | 'PM'
    | 'Team Improvement'
    | '디자이너'
    | 'iOS 개발자'
    | 'Android 개발자'
    | '웹 프론트엔드 개발자'
    | '서버 개발자';
  /** 프로젝트 팀원의 역할 상세설명 */
  description: string;
}

export interface ProjectDetailResponseDto {
  /**
   * 프로젝트의 Id
   * @format int64
   */
  id: number;
  /** 프로젝트의 이름 */
  name: string;
  /**
   * 프로젝트가 진행된 기수
   * @format int32
   */
  generation: number;
  /** 프로젝트의 카테고리 */
  category: Category;
  /** 서비스 형태 */
  serviceType: ('WEB' | 'APP')[];
  /** 프로젝트 한줄소개 */
  summary: string;
  /** 프로젝트 설명 */
  detail: string;
  /** 프로젝트 로고 이미지 URL */
  logoImage: string;
  /** 프로젝트 썸네일 이미지 URL */
  thumbnailImage: string;
  /** 서비스 이용 가능 여부 */
  isAvailable: boolean;
  /** 창업중인지 여부 */
  isFounding: boolean;
  /** 프로젝트 링크 */
  links: Link[];
  /**
   * 프로젝트 시작 날짜
   * @format date
   */
  startAt: string;
  /**
   * 프로젝트 종료 날짜. 프로젝트가 진행중 일 경우 값 없음
   * @format date
   */
  endAt?: string | null;
  /** 프로젝트 이미지 URL */
  projectImage?: string | null;
  /**
   * 프로젝트를 등록한 시간
   * @format date-time
   */
  uploadedAt: string;
  /**
   * 프로젝트를 수정한 시간
   * @format date-time
   */
  updatedAt: string;
  /** 프로젝트 팀원 */
  members: Member[];
}

export interface NotificationListResponse {
  /** @format int32 */
  generation?: number;
  emailList?: string[];
}

export interface ActivitiesRecords {
  /**
   * 활동 회원 수
   * @format int32
   * @example 154
   */
  activitiesMemberCount?: number;
  /**
   * 프로젝트 수
   * @format int32
   * @example 1
   */
  projectCounts?: number;
  /**
   * 스터디 수
   * @format int32
   * @example 98
   */
  studyCounts?: number;
}

export interface BrandingColor {
  main?: string;
  high?: string;
  low?: string;
  point?: string;
}

export interface LatestNews {
  /** @format int32 */
  id?: number;
  title?: string;
  image?: string;
  link?: string;
}

export interface MainButton {
  text?: string;
  keyColor?: string;
  subColor?: string;
}

/** 메인 페이지 데이터 */
export interface MainPageResponse {
  /**
   * 기수
   * @format int32
   * @example 35
   */
  generation?: number;
  /**
   * 기수명
   * @example "35기"
   */
  name?: string;
  brandingColor?: BrandingColor;
  mainButton?: MainButton;
  partIntroduction?: PartIntroduction[];
  latestNews?: LatestNews[];
  recruitSchedule?: RecruitSchedule[];
  activitiesRecords?: ActivitiesRecords;
}

export interface PartIntroduction {
  part?: string;
  description?: string;
}

export interface RecruitSchedule {
  type?: string;
  schedule?: Schedule;
}

export interface Schedule {
  applicationStartTime?: string;
  applicationEndTime?: string;
  applicationResultTime?: string;
  interviewStartTime?: string;
  interviewEndTime?: string;
  finalResultTime?: string;
}

export interface Introduction {
  content?: string;
  preference?: string;
}

export interface Question {
  question?: string;
  answer?: string;
}

/** Recruiting 페이지 데이터 */
export interface RecruitPageResponse {
  /**
   * 기수
   * @format int32
   * @example 35
   */
  generation?: number;
  /**
   * 기수명
   * @example "35기"
   */
  name?: string;
  /** 모집 헤더 이미지 URL */
  recruitHeaderImage?: string;
  brandingColor?: BrandingColor;
  recruitSchedule?: RecruitSchedule[];
  recruitPartCurriculum?: RecruitPartCurriculum[];
  recruitQuestion?: RecruitQuestion[];
}

export interface RecruitPartCurriculum {
  part?: string;
  introduction?: Introduction;
}

export interface RecruitQuestion {
  part?: string;
  questions?: Question[];
}

/** About 페이지 데이터 */
export interface AboutPageResponse {
  /**
   * 기수
   * @format int32
   * @example 35
   */
  generation?: number;
  /**
   * 기수명
   * @example "35기"
   */
  name?: string;
  /** 헤더 이미지 URL */
  headerImage?: string;
  brandingColor?: BrandingColor;
  coreValue?: CoreValue[];
  partCurriculum?: PartCurriculum[];
  member?: Member[];
}

export interface CoreValue {
  value?: string;
  description?: string;
  image?: string;
}

export interface PartCurriculum {
  part?: string;
  curriculums?: string[];
}

/** 브랜딩 컬러 정보 */
export interface GetAdminBrandingColorResponseRecordDto {
  /**
   * 메인 컬러
   * @example "#FF0000"
   */
  main: string;
  /**
   * 로우 톤 컬러
   * @example "#CC0000"
   */
  low: string;
  /**
   * 하이 톤 컬러
   * @example "#FF3333"
   */
  high: string;
  /**
   * 포인트 컬러
   * @example "#FF9999"
   */
  point: string;
}

/** 핵심 가치 정보 */
export interface GetAdminCoreValueResponseRecordDto {
  /**
   * 핵심 가치
   * @example "용기"
   */
  value: string;
  /**
   * 핵심 가치 설명
   * @example "새로운 도전을 위해 과감히 용기내는 사람"
   */
  description: string;
  /**
   * 핵심 가치 이미지 링크
   * @example "https://corevalue.png"
   */
  image: string;
}

/** 소개글 정보 */
export interface GetAdminIntroductionResponseRecordDto {
  /**
   * 내용
   * @example "Android 앱 개발"
   */
  content: string;
  /**
   * 우대사항
   * @example "Kotlin 개발 경험"
   */
  preference: string;
}

/** 최신소식 */
export interface GetAdminLatestNewsResponseRecordDto {
  /**
   * 최신소식 ID
   * @format int32
   * @example 1
   */
  id: number;
  /**
   * 최신소식 제목
   * @example "Mind 23"
   */
  title: string;
}

/** 메인 버튼 스타일 */
export interface GetAdminMainButtonResponseRecordDto {
  /**
   * 버튼 텍스트
   * @example "지원하기"
   */
  text: string;
  /**
   * 주요 컬러
   * @example "#FF0000"
   */
  keyColor: string;
  /**
   * 보조 컬러
   * @example "#CC0000"
   */
  subColor: string;
}

/** 멤버 정보 */
export interface GetAdminMemberResponseRecordDto {
  /**
   * 역할
   * @example "회장"
   */
  role: string;
  /**
   * 이름
   * @example "홍길동"
   */
  name: string;
  /**
   * 소속
   * @example "SOPT"
   */
  affiliation: string;
  /**
   * 한줄 소개
   * @example "안녕하세요!"
   */
  introduction: string;
  /**
   * 프로필 이미지 링크
   * @example "https://profile.png"
   */
  profileImage: string;
  /** SNS 링크 정보 */
  sns: GetAdminSnsLinksResponseRecordDto;
}

/** 파트별 커리큘럼 정보 */
export interface GetAdminPartCurriculumResponseRecordDto {
  /**
   * 파트명
   * @example "안드로이드"
   */
  part: string;
  /** 주차별 커리큘럼 */
  curriculums: string[];
}

/** 파트 소개 정보 */
export interface GetAdminPartIntroductionResponseRecordDto {
  /**
   * 파트명
   * @example "안드로이드"
   */
  part: string;
  /**
   * 파트 설명
   * @example "Android 앱 개발"
   */
  description: string;
}

/** 질문과 답변 정보 */
export interface GetAdminQuestionResponseRecordDto {
  /**
   * 질문
   * @example "몇명 뽑나요?"
   */
  question: string;
  /**
   * 답변
   * @example "10명 뽑아요."
   */
  answer: string;
}

/** 모집 파트 커리큘럼 정보 */
export interface GetAdminRecruitPartCurriculumResponseRecordDto {
  /**
   * 파트명
   * @example "안드로이드"
   */
  part: string;
  /** 소개글 정보 */
  introduction: GetAdminIntroductionResponseRecordDto;
}

/** 모집 질문 정보 */
export interface GetAdminRecruitQuestionResponseRecordDto {
  /**
   * 파트명
   * @example "안드로이드"
   */
  part: string;
  /** 질문 리스트 */
  questions: GetAdminQuestionResponseRecordDto[];
}

/** 모집 일정 정보 */
export interface GetAdminRecruitScheduleResponseRecordDto {
  /**
   * 타입
   * @example "OB"
   */
  type: 'OB' | 'YB';
  /** 상세 일정 정보 */
  schedule: GetAdminScheduleResponseRecordDto;
}

/** 어드민 데이터 조회하기 */
export interface GetAdminResponseDto {
  /**
   * 기수
   * @format int32
   * @example 34
   */
  generation: number;
  /**
   * 기수명
   * @example "SOPT"
   */
  name: string;
  recruitSchedule?: GetAdminRecruitScheduleResponseRecordDto[];
  /** 브랜딩 컬러 정보 */
  brandingColor?: GetAdminBrandingColorResponseRecordDto;
  /** 메인 버튼 스타일 */
  mainButton?: GetAdminMainButtonResponseRecordDto;
  partIntroduction?: GetAdminPartIntroductionResponseRecordDto[];
  latestNews?: GetAdminLatestNewsResponseRecordDto[];
  /**
   * 헤더 이미지 링크
   * @example "https://header.png"
   */
  headerImage: string;
  coreValue?: GetAdminCoreValueResponseRecordDto[];
  partCurriculum?: GetAdminPartCurriculumResponseRecordDto[];
  member?: GetAdminMemberResponseRecordDto[];
  /**
   * 지원하기 헤더 이미지 링크
   * @example "https://recruit_header.png"
   */
  recruitHeaderImage: string;
  recruitPartCurriculum?: GetAdminRecruitPartCurriculumResponseRecordDto[];
  recruitQuestion?: GetAdminRecruitQuestionResponseRecordDto[];
}

/** 상세 일정 정보 */
export interface GetAdminScheduleResponseRecordDto {
  /**
   * 지원 시작 시간
   * @example "2024-01-01T09:00:00.000Z"
   */
  applicationStartTime: string;
  /**
   * 지원 종료 시간
   * @example "2024-01-31T18:00:00.000Z"
   */
  applicationEndTime: string;
  /**
   * 지원 결과 발표 시간
   * @example "2024-02-01T12:00:00.000Z"
   */
  applicationResultTime: string;
  /**
   * 면접 시작 시간
   * @example "2024-02-05T09:00:00.000Z"
   */
  interviewStartTime: string;
  /**
   * 면접 종료 시간
   * @example "2024-02-05T18:00:00.000Z"
   */
  interviewEndTime: string;
  /**
   * 최종 결과 발표 시간
   * @example "2024-02-10T12:00:00.000Z"
   */
  finalResultTime: string;
}

/** SNS 링크 정보 */
export interface GetAdminSnsLinksResponseRecordDto {
  /**
   * 이메일
   * @example "example@sopt.org"
   */
  email?: string;
  /**
   * 링크드인 URL
   * @example "https://www.linkedin.com/in/example"
   */
  linkedin?: string;
  /**
   * 깃허브 URL
   * @example "https://github.com/example"
   */
  github?: string;
  /**
   * 비핸스 URL
   * @example "https://www.behance.net/example"
   */
  behance?: string;
}

/** 최신소식 조회하기 */
export interface GetAdminNewsResponseDto {
  /**
   * 이미지 ID
   * @format int32
   * @example 1
   */
  id: number;
  /**
   * 이미지 링크
   * @example "https://image.url"
   */
  image: string;
  /**
   * 제목
   * @example "MIND 23"
   */
  title: string;
  /**
   * 링크
   * @example "https://disquiet.io/product/mind-23-%EC%98%A4%EB%8A%98%EB%8F%84-%EB%A9%88%EC%B6%94%EC%A7%80-%EC%95%8A%EB%8A%94-it%EC%9D%B8%EB%93%A4"
   */
  link: string;
}

export type GetTodayVisitorData = GetTodayVisitorResponseDto;

export type VisitorCountUpData = VisitorCountUpResponseDto;

export type GetSoptStoryListData = PaginatedSoptStoryResponse;

export type CreateSoptStoryData = CreateSoptStoryResponse;

export type UnlikeSoptStoryData = LikeSoptStoryResponse;

export type LikeSoptStoryData = LikeSoptStoryResponse;

export type GetPresignedUrlData = PresignedUrlResponse;

export type GetReviewsData = PaginateResponseDto;

export type CreateReviewData = string;

export type RegisterData = RegisterNotificationResponse;

export type ScrapLinkData = ScrapLinkResponseDto;

export type GetMainData = GetAdminResponseDto;

export type AddMainData = AddAdminResponseDto;

export type AddMainNewsData = AddAdminNewsResponseDto;

export type AddMainNewsV2Data = AddAdminNewsResponseDto;

export type DeleteMainNewsData = DeleteAdminNewsResponseDto;

export type AddMainConfirmData = AddAdminConfirmResponseDto;

export type GetRandomReviewsByPartData = ReviewRes[];

export type GetReviewsByAuthorData = ReviewsByAuthorRes;

export type GetProjectsData = PaginateResponseDto;

export type GetProjectData = ProjectDetailResponseDto;

export type GetListData = NotificationListResponse;

export type GetMainPageData = MainPageResponse;

export type GetRecruitPageData = RecruitPageResponse;

export type GetAboutPageData = AboutPageResponse;

export type HealthCheckData = string;

export type TestSentryErrorData = any;

export type TestSentryError3Data = any;

export type TestSentryError2Data = any;

export type GetMainNewsData = GetAdminNewsResponseDto;
