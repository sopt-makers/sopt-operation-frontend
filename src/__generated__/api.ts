/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/notification/register': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['registerNotification'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/admin': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 어드민 메인 데이터 조회
     * @description 어드민 메인 데이터를 조회합니다
     */
    get: operations['getMain'];
    put?: never;
    /**
     * 어드민 메인 데이터 배포
     * @description 어드민 메인 데이터를 배포합니다
     */
    post: operations['addMain'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/admin/news': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 최신소식 조회
     * @description 최신소식을 조회합니다
     */
    get: operations['getMainNews'];
    put?: never;
    /**
     * 최신소식 추가
     * @description 최신소식을 추가합니다
     */
    post: operations['addMainNews'];
    /**
     * 최신소식 삭제
     * @description 최신소식을 삭제합니다
     */
    delete: operations['deleteMainNews'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/admin/confirm': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * 어드민 메인 데이터 배포 확인
     * @description 어드민 메인 데이터 배포를 확인합니다
     */
    post: operations['addMainConfirm'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/semesters': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['getSemesters'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/projects': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['getAllProject'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/notification/list': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['getAllProject_1'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/homepage': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 메인 페이지 조회
     * @description 메인 페이지 데이터를 조회합니다
     */
    get: operations['getMainPage'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/homepage/recruit': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 지원하기 페이지 조회
     * @description 지원하기 페이지 데이터를 조회합니다
     */
    get: operations['get'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/homepage/about': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 소개 페이지 조회
     * @description 소개 페이지 데이터를 조회합니다
     */
    get: operations['getAboutPage'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/health': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['healthCheck'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    RegisterNotificationResponseDto: {
      /**
       * Format: int32
       * @description Notification ID
       */
      id: number;
      /**
       * Format: int32
       * @description 기수 (Generation)
       */
      generation: number;
      /** @description 이메일 (Email) */
      email: string;
      /**
       * Format: date-time
       * @description 생성일자 (Creation Date)
       */
      createdAt: string;
    };
    /** @description 브랜딩 컬러 */
    AddAdminBrandingColorRequestDto: {
      /**
       * @description 메인 컬러
       * @example #FF0000
       */
      main: string;
      /**
       * @description 로우 톤 컬러
       * @example #CC0000
       */
      low: string;
      /**
       * @description 하이 톤 컬러
       * @example #FF3333
       */
      high: string;
      /**
       * @description 포인트 컬러
       * @example #FF9999
       */
      point: string;
    };
    /** @description 핵심 가치 */
    AddAdminCoreValueRequestDto: {
      /**
       * @description 핵심 가치
       * @example 용기
       */
      value: string;
      /**
       * @description 핵심 가치 설명
       * @example 새로운 도전을 위해 과감히 용기내는 사람
       */
      description: string;
      /**
       * @description 핵심 가치 이미지 파일명
       * @example image.png
       */
      imageFileName: string;
    };
    /** @description 주차별 커리큘럼 정보 */
    AddAdminCurriculumWeekRequestDto: {
      /**
       * Format: int32
       * @description 주차
       * @example 1
       */
      week: number;
      /**
       * @description 커리큘럼 설명
       * @example Android 기초 학습
       */
      description: string;
    };
    /** @description 소개글 정보 */
    AddAdminIntroductionRequestDto: {
      /**
       * @description 내용
       * @example Android 앱 개발
       */
      content: string;
      /**
       * @description 우대사항
       * @example Kotlin 개발 경험
       */
      preference: string;
    };
    /** @description 메인 버튼 스타일 */
    AddAdminMainButtonRequestDto: {
      /**
       * @description 버튼 텍스트
       * @example 지원하기
       */
      text: string;
      /**
       * @description 주요 컬러
       * @example #FF0000
       */
      keyColor: string;
      /**
       * @description 보조 컬러
       * @example #CC0000
       */
      subColor: string;
    };
    /** @description 멤버 정보 */
    AddAdminMemberRequestDto: {
      /**
       * @description 역할
       * @example 회장
       */
      role: string;
      /**
       * @description 이름
       * @example 홍길동
       */
      name: string;
      /**
       * @description 소속
       * @example SOPT
       */
      affiliation: string;
      /**
       * @description 한줄 소개
       * @example 안녕하세요!
       */
      introduction: string;
      sns: components['schemas']['AddAdminSnsLinksRequestDto'];
      /**
       * @description 프로필 이미지 파일명
       * @example image.png
       */
      profileImageFileName: string;
    };
    /** @description 파트별 커리큘럼 */
    AddAdminPartCurriculumRequestDto: {
      /**
       * @description 파트명
       * @example 안드로이드
       */
      part: string;
      /** @description 주차별 커리큘럼 */
      weeks: components['schemas']['AddAdminCurriculumWeekRequestDto'][];
    };
    /** @description 파트 소개 */
    AddAdminPartIntroductionRequestDto: {
      /**
       * @description 파트명
       * @example 안드로이드
       */
      part: string;
      /**
       * @description 파트 설명
       * @example Android 앱 개발
       */
      description: string;
    };
    /** @description 질문과 답변 */
    AddAdminQuestionRequestDto: {
      /**
       * @description 질문
       * @example 몇명 뽑나요?
       */
      question: string;
      /**
       * @description 답변
       * @example 10명 뽑아요.
       */
      answer: string;
    };
    /** @description 모집 파트 커리큘럼 */
    AddAdminRecruitPartCurriculumRequestDto: {
      /**
       * @description 파트명
       * @example 안드로이드
       */
      part: string;
      introduction: components['schemas']['AddAdminIntroductionRequestDto'];
    };
    /** @description 모집 질문 */
    AddAdminRecruitQuestionRequestDto: {
      /**
       * @description 파트명
       * @example 안드로이드
       */
      part: string;
      /** @description 질문 리스트 */
      questions: components['schemas']['AddAdminQuestionRequestDto'][];
    };
    /** @description 모집 일정 */
    AddAdminRecruitScheduleRequestDto: {
      /**
       * @description 타입
       * @example OB
       * @enum {string}
       */
      type: 'OB' | 'YB';
      schedule: components['schemas']['AddAdminScheduleRequestDto'];
    };
    /** @description 어드민 배포하기 */
    AddAdminRequestDto: {
      /**
       * Format: int32
       * @description 기수
       * @example 34
       */
      generation: number;
      /**
       * @description 기수명
       * @example SOPT
       */
      name: string;
      recruitSchedule?: components['schemas']['AddAdminRecruitScheduleRequestDto'][];
      brandingColor?: components['schemas']['AddAdminBrandingColorRequestDto'];
      mainButton?: components['schemas']['AddAdminMainButtonRequestDto'];
      partIntroduction?: components['schemas']['AddAdminPartIntroductionRequestDto'][];
      /**
       * @description 헤더 이미지 파일명
       * @example header.png
       */
      headerImageFileName: string;
      coreValue?: components['schemas']['AddAdminCoreValueRequestDto'][];
      partCurriculum?: components['schemas']['AddAdminPartCurriculumRequestDto'][];
      member?: components['schemas']['AddAdminMemberRequestDto'][];
      /**
       * @description 지원하기 헤더 이미지 파일명
       * @example recruit_header.png
       */
      recruitHeaderImageFileName: string;
      recruitPartCurriculum?: components['schemas']['AddAdminRecruitPartCurriculumRequestDto'][];
      recruitQuestion?: components['schemas']['AddAdminRecruitQuestionRequestDto'][];
    };
    /** @description 상세 일정 */
    AddAdminScheduleRequestDto: {
      /**
       * @description 지원 시작 시간
       * @example 2024-01-01 09:00:00
       */
      applicationStartTime: string;
      /**
       * @description 지원 종료 시간
       * @example 2024-01-31 18:00:00
       */
      applicationEndTime: string;
      /**
       * @description 지원 결과 발표 시간
       * @example 2024-02-01 12:00:00
       */
      applicationResultTime: string;
      /**
       * @description 면접 시작 시간
       * @example 2024-02-05 09:00:00
       */
      interviewStartTime: string;
      /**
       * @description 면접 종료 시간
       * @example 2024-02-05 18:00:00
       */
      interviewEndTime: string;
      /**
       * @description 최종 결과 발표 시간
       * @example 2024-02-10 12:00:00
       */
      finalResultTime: string;
    };
    /** @description SNS 링크 정보 */
    AddAdminSnsLinksRequestDto: {
      /**
       * @description 이메일
       * @example example@sopt.org
       */
      email?: string;
      /**
       * @description 링크드인 URL
       * @example https://www.linkedin.com/in/example
       */
      linkedin?: string;
      /**
       * @description 깃허브 URL
       * @example https://github.com/example
       */
      github?: string;
      /**
       * @description 비핸스 URL
       * @example https://www.behance.net/example
       */
      behance?: string;
    };
    /** @description 핵심가치 이미지 S3 PresigneUrl 정보 */
    AddAdminCoreValueResponseRecordDto: {
      /**
       * @description 핵심 가치
       * @example 용기
       */
      value: string;
      /** @description 핵심가치 이미지 PresgiendUrl */
      image: string;
    };
    /** @description 멤버 프로필 이미지 S3 PresigneUrl 정보 */
    AddAdminMemberResponseRecordDto: {
      /**
       * @description 역할
       * @example 회장
       */
      role: string;
      /**
       * @description 이름
       * @example 홍길동
       */
      name: string;
      /** @description 프로필 이미지 PresgiendUrl */
      profileImage: string;
    };
    /** @description 어드민 메인정보 추가 */
    AddAdminResponseDto: {
      /**
       * Format: int32
       * @description 기수
       * @example 34
       */
      generation: number;
      /**
       * @description 헤더 이미지 S3 PresignedUrl
       * @example https://image.url
       */
      headerImage: string;
      /** @description 핵심가치 이미지 S3 PresigneUrl 정보 */
      coreValues: components['schemas']['AddAdminCoreValueResponseRecordDto'][];
      /** @description 멤버 프로필 이미지 S3 PresigneUrl 정보 */
      members: components['schemas']['AddAdminMemberResponseRecordDto'][];
      /**
       * @description 지원하기 헤더 이미지 S3 PresignedUrl
       * @example https://image.url
       */
      recruitHeaderImage: string;
    };
    /** @description 최신소식 추가하기 */
    AddAdminNewsRequestDto: FormData;
    /** @description 어드민 배포 확인 */
    AddAdminConfirmRequestDto: {
      /**
       * Format: int32
       * @description 기수
       * @example 34
       */
      generation: number;
    };
    SemestersListResponse: {
      /**
       * Format: int32
       * @description 페이지네이션 조회 조건 페이지 수
       */
      page?: number;
      /**
       * Format: int32
       * @description 페이지네이션 조회로 기수 정보 가져올 갯수
       */
      limit?: number;
      /**
       * Format: int64
       * @description 조회한 기수 리스트 수
       */
      total?: number;
      /** @description 기수 대표 정보 */
      semesters?: components['schemas']['SemestersResponse'][] | null;
    };
    /** @description 기수 대표 정보 */
    SemestersResponse: {
      /**
       * Format: int32
       * @description 역대 기수
       */
      id?: number;
      /** @description 기수에 사용했던 컬러 */
      color?: string | null;
      /** @description 기수에 사용했던 로고 */
      logo?: string;
      /** @description 기수에 사용했던 백그라운드 이미지 */
      background?: string | null;
      /** @description 기수에 사용했던 테마명 */
      name?: string | null;
      /** @description 기수 활동 기간 */
      year?: string;
    } | null;
    /** @description 프로젝트의 카테고리 */
    Category: {
      /** @enum {string} */
      project:
        | 'APPJAM'
        | 'SOPKATHON'
        | 'SOPTERM'
        | 'STUDY'
        | 'JOINTSEMINAR'
        | 'ETC';
    };
    /** @description 프로젝트 링크 */
    Link: {
      /**
       * @description 웹사이트, 구글 플레이스토어, 앱스토어, Github, 발표영상 등 프로젝트에 관련된 링크의 종류
       * @example website
       * @enum {string}
       */
      title:
        | 'website'
        | 'googlePlay'
        | 'appStore'
        | 'github'
        | 'media'
        | 'instagram';
      /**
       * @description 링크의 url 주소
       * @example https://example.com
       */
      url: string;
    };
    PaginateResponseProjectResponse: {
      data?: components['schemas']['ProjectResponse'][];
      /** @description 다음 페이지가 있는지 여부를 나타냄. */
      hasNextPage: boolean;
      /** @description 이전 페이지가 있는지 여부를 나타냄. */
      hasPrevPage: boolean;
      /**
       * Format: int32
       * @description 총 data 들의 갯수
       */
      totalCount: number;
      /**
       * Format: int32
       * @description 총 페이지 카운트
       */
      totalPage: number;
      /**
       * Format: int32
       * @description 현재 페이지
       */
      currentPage: number;
      /**
       * Format: int32
       * @description item을 몇개까지 가져올지에 대한 카운트
       */
      limit: number;
    };
    ProjectResponse: {
      /**
       * Format: int64
       * @description 프로젝트의 Id
       */
      id: number;
      /** @description 프로젝트의 이름 */
      name: string;
      /**
       * Format: int32
       * @description 프로젝트가 진행된 기수
       */
      generation: number;
      category: components['schemas']['Category'];
      /** @description 서비스 형태 */
      serviceType: ('WEB' | 'APP')[];
      /** @description 프로젝트 한줄소개 */
      summary: string;
      /** @description 프로젝트 설명 */
      detail: string;
      /** @description 프로젝트 로고 이미지 URL */
      logoImage: string;
      /** @description 프로젝트 썸네일 이미지 URL */
      thumbnailImage: string;
      /** @description 서비스 이용 가능 여부 */
      isAvailable: boolean;
      /** @description 창업중인지 여부 */
      isFounding: boolean;
      /** @description 프로젝트 링크 */
      links: components['schemas']['Link'][];
    };
    GetNotificationListResponseDto: {
      /**
       * Format: int32
       * @description 기수
       * @example 34
       */
      generation: number;
      /**
       * @description 모집알림 신청한 이메일 리스트
       * @example [
       *       "example@naver.com",
       *       "example2@naver.com",
       *       "example3@naver.com"
       *     ]
       */
      emailList: string[];
    };
    /** @description 브랜딩 컬러 정보 */
    GetMainBrandingColorResponseRecordDto: {
      /**
       * @description 메인 컬러
       * @example #FF0000
       */
      main: string;
      /**
       * @description 로우 톤 컬러
       * @example #CC0000
       */
      low: string;
      /**
       * @description 하이 톤 컬러
       * @example #FF3333
       */
      high: string;
      /**
       * @description 포인트 컬러
       * @example #FF9999
       */
      point: string;
    };
    /** @description 최신소식 */
    GetMainLatestNewsResponseRecordDto: {
      /**
       * Format: int32
       * @description 최신소식 ID
       * @example 1
       */
      id: number;
      /**
       * @description 최신소식 제목
       * @example Mind 23
       */
      title: string;
      /**
       * @description 최신소식 이미지 링크
       * @example https://image.url
       */
      image: string;
      /**
       * @description 최신소식 링크
       * @example https://news.url
       */
      link: string;
    };
    /** @description 메인 버튼 스타일 */
    GetMainMainButtonResponseRecordDto: {
      /**
       * @description 버튼 텍스트
       * @example 지원하기
       */
      text: string;
      /**
       * @description 주요 컬러
       * @example #FF0000
       */
      keyColor: string;
      /**
       * @description 보조 컬러
       * @example #CC0000
       */
      subColor: string;
    };
    /** @description 메인 페이지 데이터 조회하기 */
    GetMainPageResponseDto: {
      /**
       * Format: int32
       * @description 기수
       * @example 34
       */
      generation: number;
      /**
       * @description 기수명
       * @example SOPT
       */
      name: string;
      brandingColor?: components['schemas']['GetMainBrandingColorResponseRecordDto'];
      mainButton?: components['schemas']['GetMainMainButtonResponseRecordDto'];
      partIntroduction?: components['schemas']['GetMainPartIntroductionResponseRecordDto'][];
      latestNews?: components['schemas']['GetMainLatestNewsResponseRecordDto'][];
    };
    /** @description 파트 소개 정보 */
    GetMainPartIntroductionResponseRecordDto: {
      /**
       * @description 파트명
       * @example 안드로이드
       */
      part: string;
      /**
       * @description 파트 설명
       * @example Android 앱 개발
       */
      description: string;
    };
    /** @description 소개글 정보 */
    GetMainIntroductionResponseRecordDto: {
      /**
       * @description 내용
       * @example Android 앱 개발
       */
      content: string;
      /**
       * @description 우대사항
       * @example Kotlin 개발 경험
       */
      preference: string;
    };
    /** @description 질문과 답변 정보 */
    GetMainQuestionResponseRecordDto: {
      /**
       * @description 질문
       * @example 몇명 뽑나요?
       */
      question: string;
      /**
       * @description 답변
       * @example 10명 뽑아요.
       */
      answer: string;
    };
    /** @description 모집 파트 커리큘럼 정보 */
    GetMainRecruitPartCurriculumResponseRecordDto: {
      /**
       * @description 파트명
       * @example 안드로이드
       */
      part: string;
      introduction: components['schemas']['GetMainIntroductionResponseRecordDto'];
    };
    /** @description 모집 질문 정보 */
    GetMainRecruitQuestionResponseRecordDto: {
      /**
       * @description 파트명
       * @example 안드로이드
       */
      part: string;
      /** @description 질문 리스트 */
      questions: components['schemas']['GetMainQuestionResponseRecordDto'][];
    };
    /** @description 모집 일정 정보 */
    GetMainRecruitScheduleResponseRecordDto: {
      /**
       * @description 타입
       * @example OB
       * @enum {string}
       */
      type: 'OB' | 'YB';
      schedule: components['schemas']['GetMainScheduleResponseRecordDto'];
    };
    /** @description 상세 일정 정보 */
    GetMainScheduleResponseRecordDto: {
      /**
       * @description 지원 시작 시간
       * @example 2024-01-01 09:00:00
       */
      applicationStartTime: string;
      /**
       * @description 지원 종료 시간
       * @example 2024-01-31 18:00:00
       */
      applicationEndTime: string;
      /**
       * @description 지원 결과 발표 시간
       * @example 2024-02-01 12:00:00
       */
      applicationResultTime: string;
      /**
       * @description 면접 시작 시간
       * @example 2024-02-05 09:00:00
       */
      interviewStartTime: string;
      /**
       * @description 면접 종료 시간
       * @example 2024-02-05 18:00:00
       */
      interviewEndTime: string;
      /**
       * @description 최종 결과 발표 시간
       * @example 2024-02-10 12:00:00
       */
      finalResultTime: string;
    };
    /** @description 지원하기 페이지 데이터 조회하기 */
    GetRecruitingPageResponseDto: {
      /**
       * Format: int32
       * @description 기수
       * @example 34
       */
      generation: number;
      /**
       * @description 기수명
       * @example SOPT
       */
      name: string;
      /**
       * @description 지원하기 헤더 이미지 링크
       * @example https://recruit_header.png
       */
      recruitHeaderImage: string;
      brandingColor?: components['schemas']['GetMainBrandingColorResponseRecordDto'];
      recruitSchedule?: components['schemas']['GetMainRecruitScheduleResponseRecordDto'][];
      recruitPartCurriculum?: components['schemas']['GetMainRecruitPartCurriculumResponseRecordDto'][];
      recruitQuestion?: components['schemas']['GetMainRecruitQuestionResponseRecordDto'][];
    };
    /** @description 소개 페이지 데이터 조회하기 */
    GetAboutPageResponseDto: {
      /**
       * Format: int32
       * @description 기수
       * @example 34
       */
      generation: number;
      /**
       * @description 기수명
       * @example SOPT
       */
      name: string;
      /**
       * @description 헤더 이미지 링크
       * @example https://header.png
       */
      headerImage: string;
      brandingColor?: components['schemas']['GetMainBrandingColorResponseRecordDto'];
      coreValue?: components['schemas']['GetMainCoreValueResponseRecordDto'][];
      partCurriculum?: components['schemas']['GetMainPartCurriculumResponseRecordDto'][];
      member?: components['schemas']['GetMainMemberResponseRecordDto'][];
    };
    /** @description 핵심 가치 정보 */
    GetMainCoreValueResponseRecordDto: {
      /**
       * @description 핵심 가치
       * @example 용기
       */
      value: string;
      /**
       * @description 핵심 가치 설명
       * @example 새로운 도전을 위해 과감히 용기내는 사람
       */
      description: string;
      /**
       * @description 핵심 가치 이미지 링크
       * @example https://corevalue.png
       */
      image: string;
    };
    /** @description 주차별 커리큘럼 정보 */
    GetMainCurriculumWeekResponseRecordDto: {
      /**
       * Format: int32
       * @description 주차
       * @example 1
       */
      week: number;
      /**
       * @description 커리큘럼 설명
       * @example Android 기초 학습
       */
      description: string;
    };
    /** @description 멤버 정보 */
    GetMainMemberResponseRecordDto: {
      /**
       * @description 역할
       * @example 회장
       */
      role: string;
      /**
       * @description 이름
       * @example 홍길동
       */
      name: string;
      /**
       * @description 소속
       * @example SOPT
       */
      affiliation: string;
      /**
       * @description 한줄 소개
       * @example 안녕하세요!
       */
      introduction: string;
      /**
       * @description 프로필 이미지 링크
       * @example https://profile.png
       */
      profileImage: string;
      sns: components['schemas']['GetMainSnsLinksResponseRecordDto'];
    };
    /** @description 파트별 커리큘럼 정보 */
    GetMainPartCurriculumResponseRecordDto: {
      /**
       * @description 파트명
       * @example 안드로이드
       */
      part: string;
      /** @description 주차별 커리큘럼 */
      weeks: components['schemas']['GetMainCurriculumWeekResponseRecordDto'][];
    };
    /** @description SNS 링크 정보 */
    GetMainSnsLinksResponseRecordDto: {
      /**
       * @description 이메일
       * @example example@sopt.org
       */
      email?: string;
      /**
       * @description 링크드인 URL
       * @example https://www.linkedin.com/in/example
       */
      linkedin?: string;
      /**
       * @description 깃허브 URL
       * @example https://github.com/example
       */
      github?: string;
      /**
       * @description 비핸스 URL
       * @example https://www.behance.net/example
       */
      behance?: string;
    };
    /** @description 브랜딩 컬러 정보 */
    GetAdminBrandingColorResponseRecordDto: {
      /**
       * @description 메인 컬러
       * @example #FF0000
       */
      main: string;
      /**
       * @description 로우 톤 컬러
       * @example #CC0000
       */
      low: string;
      /**
       * @description 하이 톤 컬러
       * @example #FF3333
       */
      high: string;
      /**
       * @description 포인트 컬러
       * @example #FF9999
       */
      point: string;
    };
    /** @description 핵심 가치 정보 */
    GetAdminCoreValueResponseRecordDto: {
      /**
       * @description 핵심 가치
       * @example 용기
       */
      value: string;
      /**
       * @description 핵심 가치 설명
       * @example 새로운 도전을 위해 과감히 용기내는 사람
       */
      description: string;
      /**
       * @description 핵심 가치 이미지 링크
       * @example https://corevalue.png
       */
      image: string;
    };
    /** @description 주차별 커리큘럼 정보 */
    GetAdminCurriculumWeekResponseRecordDto: {
      /**
       * Format: int32
       * @description 주차
       * @example 1
       */
      week: number;
      /**
       * @description 커리큘럼 설명
       * @example Android 기초 학습
       */
      description: string;
    };
    /** @description 소개글 정보 */
    GetAdminIntroductionResponseRecordDto: {
      /**
       * @description 내용
       * @example Android 앱 개발
       */
      content: string;
      /**
       * @description 우대사항
       * @example Kotlin 개발 경험
       */
      preference: string;
    };
    /** @description 최신소식 */
    GetAdminLatestNewsResponseRecordDto: {
      /**
       * Format: int32
       * @description 최신소식 ID
       * @example 1
       */
      id: number;
      /**
       * @description 최신소식 제목
       * @example Mind 23
       */
      title: string;
    };
    /** @description 메인 버튼 스타일 */
    GetAdminMainButtonResponseRecordDto: {
      /**
       * @description 버튼 텍스트
       * @example 지원하기
       */
      text: string;
      /**
       * @description 주요 컬러
       * @example #FF0000
       */
      keyColor: string;
      /**
       * @description 보조 컬러
       * @example #CC0000
       */
      subColor: string;
    };
    /** @description 멤버 정보 */
    GetAdminMemberResponseRecordDto: {
      /**
       * @description 역할
       * @example 회장
       */
      role: string;
      /**
       * @description 이름
       * @example 홍길동
       */
      name: string;
      /**
       * @description 소속
       * @example SOPT
       */
      affiliation: string;
      /**
       * @description 한줄 소개
       * @example 안녕하세요!
       */
      introduction: string;
      /**
       * @description 프로필 이미지 링크
       * @example https://profile.png
       */
      profileImage: string;
      sns: components['schemas']['GetAdminSnsLinksResponseRecordDto'];
    };
    /** @description 파트별 커리큘럼 정보 */
    GetAdminPartCurriculumResponseRecordDto: {
      /**
       * @description 파트명
       * @example 안드로이드
       */
      part: string;
      /** @description 주차별 커리큘럼 */
      weeks: components['schemas']['GetAdminCurriculumWeekResponseRecordDto'][];
    };
    /** @description 파트 소개 정보 */
    GetAdminPartIntroductionResponseRecordDto: {
      /**
       * @description 파트명
       * @example 안드로이드
       */
      part: string;
      /**
       * @description 파트 설명
       * @example Android 앱 개발
       */
      description: string;
    };
    /** @description 질문과 답변 정보 */
    GetAdminQuestionResponseRecordDto: {
      /**
       * @description 질문
       * @example 몇명 뽑나요?
       */
      question: string;
      /**
       * @description 답변
       * @example 10명 뽑아요.
       */
      answer: string;
    };
    /** @description 모집 파트 커리큘럼 정보 */
    GetAdminRecruitPartCurriculumResponseRecordDto: {
      /**
       * @description 파트명
       * @example 안드로이드
       */
      part: string;
      introduction: components['schemas']['GetAdminIntroductionResponseRecordDto'];
    };
    /** @description 모집 질문 정보 */
    GetAdminRecruitQuestionResponseRecordDto: {
      /**
       * @description 파트명
       * @example 안드로이드
       */
      part: string;
      /** @description 질문 리스트 */
      questions: components['schemas']['GetAdminQuestionResponseRecordDto'][];
    };
    /** @description 모집 일정 정보 */
    GetAdminRecruitScheduleResponseRecordDto: {
      /**
       * @description 타입
       * @example OB
       * @enum {string}
       */
      type: 'OB' | 'YB';
      schedule: components['schemas']['GetAdminScheduleResponseRecordDto'];
    };
    /** @description 어드민 데이터 조회하기 */
    GetAdminResponseDto: {
      /**
       * Format: int32
       * @description 기수
       * @example 34
       */
      generation: number;
      /**
       * @description 기수명
       * @example SOPT
       */
      name: string;
      recruitSchedule?: components['schemas']['GetAdminRecruitScheduleResponseRecordDto'][];
      brandingColor?: components['schemas']['GetAdminBrandingColorResponseRecordDto'];
      mainButton?: components['schemas']['GetAdminMainButtonResponseRecordDto'];
      partIntroduction?: components['schemas']['GetAdminPartIntroductionResponseRecordDto'][];
      latestNews?: components['schemas']['GetAdminLatestNewsResponseRecordDto'][];
      /**
       * @description 헤더 이미지 링크
       * @example https://header.png
       */
      headerImage: string;
      coreValue?: components['schemas']['GetAdminCoreValueResponseRecordDto'][];
      partCurriculum?: components['schemas']['GetAdminPartCurriculumResponseRecordDto'][];
      member?: components['schemas']['GetAdminMemberResponseRecordDto'][];
      /**
       * @description 지원하기 헤더 이미지 링크
       * @example https://recruit_header.png
       */
      recruitHeaderImage: string;
      recruitPartCurriculum?: components['schemas']['GetAdminRecruitPartCurriculumResponseRecordDto'][];
      recruitQuestion?: components['schemas']['GetAdminRecruitQuestionResponseRecordDto'][];
    };
    /** @description 상세 일정 정보 */
    GetAdminScheduleResponseRecordDto: {
      /**
       * @description 지원 시작 시간
       * @example 2024-01-01 09:00:00
       */
      applicationStartTime: string;
      /**
       * @description 지원 종료 시간
       * @example 2024-01-31 18:00:00
       */
      applicationEndTime: string;
      /**
       * @description 지원 결과 발표 시간
       * @example 2024-02-01 12:00:00
       */
      applicationResultTime: string;
      /**
       * @description 면접 시작 시간
       * @example 2024-02-05 09:00:00
       */
      interviewStartTime: string;
      /**
       * @description 면접 종료 시간
       * @example 2024-02-05 18:00:00
       */
      interviewEndTime: string;
      /**
       * @description 최종 결과 발표 시간
       * @example 2024-02-10 12:00:00
       */
      finalResultTime: string;
    };
    /** @description SNS 링크 정보 */
    GetAdminSnsLinksResponseRecordDto: {
      /**
       * @description 이메일
       * @example example@sopt.org
       */
      email?: string;
      /**
       * @description 링크드인 URL
       * @example https://www.linkedin.com/in/example
       */
      linkedin?: string;
      /**
       * @description 깃허브 URL
       * @example https://github.com/example
       */
      github?: string;
      /**
       * @description 비핸스 URL
       * @example https://www.behance.net/example
       */
      behance?: string;
    };
    /** @description 최신소식 조회하기 */
    GetAdminNewsResponseDto: {
      /**
       * Format: int32
       * @description 이미지 ID
       * @example 1
       */
      id: number;
      /**
       * @description 이미지 링크
       * @example https://image.url
       */
      image: string;
      /**
       * @description 제목
       * @example MIND 23
       */
      title: string;
      /**
       * @description 링크
       * @example https://disquiet.io/product/mind-23-%EC%98%A4%EB%8A%98%EB%8F%84-%EB%A9%88%EC%B6%94%EC%A7%80-%EC%95%8A%EB%8A%94-it%EC%9D%B8%EB%93%A4
       */
      link: string;
    };
    /** @description 최신소식 삭제하기 */
    DeleteAdminNewsRequestDto: {
      /**
       * Format: int32
       * @description 최신소식 ID
       */
      id: number;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  registerNotification: {
    parameters: {
      query: {
        /**
         * @description 활동 기수
         * @example 34
         */
        generation: string;
        /**
         * @description 이메일
         * @example example@naver.com
         */
        email: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['RegisterNotificationResponseDto'];
        };
      };
    };
  };
  getMain: {
    parameters: {
      query: {
        /**
         * @description 기수
         * @example 35
         */
        generation: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['GetAdminResponseDto'];
        };
      };
    };
  };
  addMain: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['AddAdminRequestDto'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['AddAdminResponseDto'];
        };
      };
    };
  };
  getMainNews: {
    parameters: {
      query: {
        /** @description 최신소식 ID */
        id: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['GetAdminNewsResponseDto'];
        };
      };
    };
  };
  addMainNews: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'multipart/form-data': components['schemas']['AddAdminNewsRequestDto'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': string;
        };
      };
    };
  };
  deleteMainNews: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['DeleteAdminNewsRequestDto'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': string;
        };
      };
    };
  };
  addMainConfirm: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['AddAdminConfirmRequestDto'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': string;
        };
      };
    };
  };
  getSemesters: {
    parameters: {
      query: {
        limit: number;
        page?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['SemestersListResponse'];
        };
      };
    };
  };
  getAllProject: {
    parameters: {
      query?: {
        /** @description 프로젝트 타입 */
        filter?:
          | 'APPJAM'
          | 'SOPKATHON'
          | 'SOPTERM'
          | 'STUDY'
          | 'JOINTSEMINAR'
          | 'ETC';
        /** @description 서비스 플랫폼 */
        platform?: 'WEB' | 'APP';
        /**
         * @description 페이지
         * @example 1
         */
        pageNo?: number;
        /**
         * @description 페이지별 데이터 개수
         * @example 10
         */
        limit?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['PaginateResponseProjectResponse'];
        };
      };
    };
  };
  getAllProject_1: {
    parameters: {
      query?: {
        /** @description 기수 */
        generation?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['GetNotificationListResponseDto'];
        };
      };
    };
  };
  getMainPage: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['GetMainPageResponseDto'];
        };
      };
    };
  };
  get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['GetRecruitingPageResponseDto'];
        };
      };
    };
  };
  getAboutPage: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': components['schemas']['GetAboutPageResponseDto'];
        };
      };
    };
  };
  healthCheck: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          '*/*': string;
        };
      };
    };
  };
}
