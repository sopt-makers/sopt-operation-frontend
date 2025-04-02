declare global {
  type ATTEND_STATUS = 'ATTENDANCE' | 'ABSENT' | 'TARDY';
  type ATTEND_STATUS_KR = '출석' | '결석' | '지각';
  type PART = 'ALL' | 'PLAN' | 'DESIGN' | 'WEB' | 'ANDROID' | 'IOS' | 'SERVER';
  type ORG_ADMIN = '공통' | '홈' | '소개' | '지원하기';
  type SESSION_TYPE = 'SEMINAR' | 'EVENT' | 'ETC';
  type SESSION_STATUS = 'BEFORE' | 'FIRST' | 'SECOND' | 'END';
  type AlarmDropdownType = 'part' | 'target' | 'generation' | 'targetSelector';
  type ALARM_STATUS = 'ALL' | 'SCHEDULED' | 'COMPLETED';
  type BANNER_STATUS = 'ALL' | 'RESERVED' | 'IN_PROGRESS' | 'DONE';
  type ADMIN_STATUS =
    | 'SUPER_USER'
    | 'SOPT'
    | 'MAKERS'
    | 'NOT_CERTIFIED'
    | 'DEVELOPER';
  type TARGET_TYPE = 'ALL' | 'ACTIVE' | 'CSV';
  type LINK_TYPE = 'WEB' | 'APP' | 'NONE';

  /* 에러 */
  interface LoginError {
    success: boolean;
    message: string;
  }
  interface ProjectError {
    status: number;
    error: string;
  }

  /* 회원 정보 */
  interface Attendance {
    subAttendanceId: number;
    round: number;
    status: ATTEND_STATUS;
    updateAt: string;
  }
  interface ScoreDetailAttendance {
    round: number;
    status: ATTEND_STATUS_KR;
    date: string;
  }
  interface SessionMember {
    attendanceId: number;
    attendances: Attendance[];
    member: {
      memberId: number;
      name: string;
      university: string;
      part: string;
    };
    updatedScore: number;
  }
  interface ScoreMember {
    id: number;
    name: string;
    university: string;
    part: string;
    score: number;
    total: {
      attendance: string;
      absent: string;
      tardy: string;
      participate: string;
    };
  }
  interface ScoreMemberDetail {
    name: string;
    score: number;
    part: PART;
    university: string;
    phone: string;
    lectures: Array<{
      lecture: string;
      additiveScore: number;
      status: ATTEND_STATUS_KR;
      attendances: ScoreDetailAttendance[];
    }>;
  }

  /* 출석 세션 */
  interface SessionBase {
    part: PART;
    name: string | undefined;
    place: string | undefined;
    startDate: string; // yyyy/MM/dd HH:mm
    endDate: string; // yyyy/MM/dd HH:mm
    attribute: SESSION_TYPE;
    generation: number;
  }

  interface Lecture {
    generation: number;
    lectures: LectureList[];
  }
  interface LectureList {
    lectureId: number;
    name: string;
    partValue: PART;
    partName: string;
    startDate: string; // yyyy/MM/dd
    endDate: string; // yyyy/MM/dd
    attributeValue: SESSION_TYPE;
    attributeName: string;
    place: string;
    attendances: {
      attendance: number;
      absent: number;
      tardy: number;
      unknown: number;
    };
  }

  interface LectureDetail {
    lectureId: number;
    name: string;
    place: string;
    part: string;
    startDate: string;
    endDate: string;
    attribute: string;
  }

  interface SubLecture {
    subLectureId: number;
    round: number;
    startAt: string | null; // yyyy-MM-ddThh:mm:ss
    code: string | null;
  }

  interface Session {
    generation: number;
    lectures: LectureList[];
  }

  interface SessionDetail {
    lectureId: number;
    name: string;
    generation: number;
    part: PART;
    attribute: SESSION_TYPE;
    subLectures: SubLecture[];
    status: SESSION_STATUS;
    attendances: {
      attendance: number;
      absent: number;
      tardy: number;
      unknown: number;
    };
  }

  /* 어드민 */
  interface User {
    id: number;
    adminStatus: ADMIN_STATUS;
    name: string;
  }

  /* 로그인 */
  interface Auth {
    accessToken: string;
  }
  interface AuthHeader {
    Authorization: string;
  }
  interface LoginData {
    email: string;
    password: string;
  }
  type LoginRes = User & Auth;

  /*Sopt.org 어드민 */

  /* CoreValue */
  interface CoreValue {
    id: number;
    title: string;
    subTitle: string;
    imageUrl: string;
  }

  /* AboutSopt */
  interface AboutSopt {
    id: number;
    isPublished: boolean;
    title: string;
    bannerImage: string;
    coreDescription: string;
    planCurriculum: string;
    designCurriculum: string;
    androidCurriculum: string;
    iosCurriculum: string;
    webCurriculum: string;
    serverCurriculum: string;
    coreValues: CoreValue[];
  }

  interface ResponsePresignedUrl {
    presignedUrl: string;
  }

  /* 알림 */
  interface PostAlarmData {
    attribute: string;
    part: string | null;
    isActive: boolean | null;
    generationAt: number;
    targetList: string[] | null;
    title: string;
    content: string;
    link?: string | null;
  }

  interface AlarmData {
    createdGeneration: number;
    title: string;
    content: string;
    category: 'NOTICE' | 'NEWS';
    targetType: TARGET_TYPE;
    targetList?: Array<string>;
    part?: PART;
    linkType?: LINK_TYPE | null;
    link?: string | null;
  }

  interface ReserveAlarmData extends AlarmData {
    postDate: string;
    postTime: string;
  }
  interface Alarm {
    alarmId: number;
    sendType: '즉시 발송' | '예약 발송';
    targetType: TARGET_TYPE;
    targetPart?: PART;
    category: '공지' | '소식';
    title: string;
    content: string;
    sendAt: string;
    status: ALARM_STATUS;
  }
  interface AlarmDetail {
    part: string | null;
    targetType: TARGET_TYPE;
    title: string;
    content: string;
    link: string | null;
    linkType: LINK_TYPE | null;
    createdAt: string;
    sendAt: string | null;
  }

  interface Banner {
    content_type: string;
    end_date: string;
    id: number;
    location: string;
    publisher: string;
    start_date: string;
    status: string;
  }
}

export default global;
