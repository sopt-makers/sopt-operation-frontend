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

export interface RegisterNotificationResponseDto {
  /**
   * Notification ID
   * @format int32
   */
  id: number;
  /**
   * 기수 (Generation)
   * @format int32
   */
  generation: number;
  /** 이메일 (Email) */
  email: string;
  /**
   * 생성일자 (Creation Date)
   * @format date-time
   */
  createdAt: string;
}

/** 브랜딩 컬러 */
export interface AddAdminBrandingColorRequestDto {
  /**
   * 메인 컬러
   * @pattern ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
   * @example "#FF0000"
   */
  main: string;
  /**
   * 로우 톤 컬러
   * @pattern ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
   * @example "#CC0000"
   */
  low: string;
  /**
   * 하이 톤 컬러
   * @pattern ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
   * @example "#FF3333"
   */
  high: string;
  /**
   * 포인트 컬러
   * @pattern ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
   * @example "#FF9999"
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

export interface SemestersListResponse {
  /**
   * 페이지네이션 조회 조건 페이지 수
   * @format int32
   */
  page?: number;
  /**
   * 페이지네이션 조회로 기수 정보 가져올 갯수
   * @format int32
   */
  limit?: number;
  /**
   * 조회한 기수 리스트 수
   * @format int64
   */
  total?: number;
  /** 기수 대표 정보 */
  semesters?: SemestersResponse[] | null;
}

/** 기수 대표 정보 */
export type SemestersResponse = {
  /**
   * 역대 기수
   * @format int32
   */
  id?: number;
  /** 기수에 사용했던 컬러 */
  color?: string | null;
  /** 기수에 사용했던 로고 */
  logo?: string;
  /** 기수에 사용했던 백그라운드 이미지 */
  background?: string | null;
  /** 기수에 사용했던 테마명 */
  name?: string | null;
  /** 기수 활동 기간 */
  year?: string;
};

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
  data?: ProjectsResponseDto[];
  /** 다음 페이지가 있는지 여부를 나타냄. */
  hasNextPage: boolean;
  /** 이전 페이지가 있는지 여부를 나타냄. */
  hasPrevPage: boolean;
}

export interface ProjectsResponseDto {
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

export interface GetNotificationListResponseDto {
  /**
   * 기수
   * @format int32
   * @example 34
   */
  generation: number;
  /**
   * 모집알림 신청한 이메일 리스트
   * @example ["example@naver.com","example2@naver.com","example3@naver.com"]
   */
  emailList: string[];
}

/** 브랜딩 컬러 정보 */
export interface GetMainBrandingColorResponseRecordDto {
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

/** 최신소식 */
export interface GetMainLatestNewsResponseRecordDto {
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
  /**
   * 최신소식 이미지 링크
   * @example "https://image.url"
   */
  image: string;
  /**
   * 최신소식 링크
   * @example "https://news.url"
   */
  link: string;
}

/** 메인 버튼 스타일 */
export interface GetMainMainButtonResponseRecordDto {
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

/** 메인 페이지 데이터 조회하기 */
export interface GetMainPageResponseDto {
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
  /** 브랜딩 컬러 정보 */
  brandingColor?: GetMainBrandingColorResponseRecordDto;
  /** 메인 버튼 스타일 */
  mainButton?: GetMainMainButtonResponseRecordDto;
  partIntroduction?: GetMainPartIntroductionResponseRecordDto[];
  latestNews?: GetMainLatestNewsResponseRecordDto[];
}

/** 파트 소개 정보 */
export interface GetMainPartIntroductionResponseRecordDto {
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

/** 소개글 정보 */
export interface GetMainIntroductionResponseRecordDto {
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

/** 질문과 답변 정보 */
export interface GetMainQuestionResponseRecordDto {
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
export interface GetMainRecruitPartCurriculumResponseRecordDto {
  /**
   * 파트명
   * @example "안드로이드"
   */
  part: string;
  /** 소개글 정보 */
  introduction: GetMainIntroductionResponseRecordDto;
}

/** 모집 질문 정보 */
export interface GetMainRecruitQuestionResponseRecordDto {
  /**
   * 파트명
   * @example "안드로이드"
   */
  part: string;
  /** 질문 리스트 */
  questions: GetMainQuestionResponseRecordDto[];
}

/** 모집 일정 정보 */
export interface GetMainRecruitScheduleResponseRecordDto {
  /**
   * 타입
   * @example "OB"
   */
  type: 'OB' | 'YB';
  /** 상세 일정 정보 */
  schedule: GetMainScheduleResponseRecordDto;
}

/** 상세 일정 정보 */
export interface GetMainScheduleResponseRecordDto {
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

/** 지원하기 페이지 데이터 조회하기 */
export interface GetRecruitingPageResponseDto {
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
  /**
   * 지원하기 헤더 이미지 링크
   * @example "https://recruit_header.png"
   */
  recruitHeaderImage: string;
  /** 브랜딩 컬러 정보 */
  brandingColor?: GetMainBrandingColorResponseRecordDto;
  recruitSchedule?: GetMainRecruitScheduleResponseRecordDto[];
  recruitPartCurriculum?: GetMainRecruitPartCurriculumResponseRecordDto[];
  recruitQuestion?: GetMainRecruitQuestionResponseRecordDto[];
}

/** 소개 페이지 데이터 조회하기 */
export interface GetAboutPageResponseDto {
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
  /**
   * 헤더 이미지 링크
   * @example "https://header.png"
   */
  headerImage: string;
  /** 브랜딩 컬러 정보 */
  brandingColor?: GetMainBrandingColorResponseRecordDto;
  coreValue?: GetMainCoreValueResponseRecordDto[];
  partCurriculum?: GetMainPartCurriculumResponseRecordDto[];
  member?: GetMainMemberResponseRecordDto[];
}

/** 핵심 가치 정보 */
export interface GetMainCoreValueResponseRecordDto {
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

/** 멤버 정보 */
export interface GetMainMemberResponseRecordDto {
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
  sns: GetMainSnsLinksResponseRecordDto;
}

/** 파트별 커리큘럼 정보 */
export interface GetMainPartCurriculumResponseRecordDto {
  /**
   * 파트명
   * @example "안드로이드"
   */
  part: string;
  /** 주차별 커리큘럼 */
  curriculums: string[];
}

/** SNS 링크 정보 */
export interface GetMainSnsLinksResponseRecordDto {
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

export type RegisterNotificationData = RegisterNotificationResponseDto;

export type GetMainData = GetAdminResponseDto;

export type AddMainData = AddAdminResponseDto;

export type GetMainNewsData = GetAdminNewsResponseDto;

export type AddMainNewsData = AddAdminNewsResponseDto;

export type DeleteMainNewsData = DeleteAdminNewsResponseDto;

export type AddMainConfirmData = AddAdminConfirmResponseDto;

export type GetSemestersData = SemestersListResponse;

export type GetProjectsData = PaginateResponseDto;

export type GetProjectData = ProjectDetailResponseDto;

export type GetAllProjectData = GetNotificationListResponseDto;

export type GetMainPageData = GetMainPageResponseDto;

export type GetData = GetRecruitingPageResponseDto;

export type GetAboutPageData = GetAboutPageResponseDto;

export type HealthCheckData = string;
