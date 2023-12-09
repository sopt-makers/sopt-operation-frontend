declare global {
  type ATTEND_STATUS = 'ATTENDANCE' | 'ABSENT' | 'TARDY';
  type ATTEND_STATUS_KR = '출석' | '결석' | '지각';
  type PART = 'ALL' | 'PLAN' | 'DESIGN' | 'WEB' | 'ANDROID' | 'IOS' | 'SERVER';
  type SESSION_TYPE = 'SEMINAR' | 'EVENT' | 'ETC';
  type SESSION_STATUS = 'BEFORE' | 'FIRST' | 'SECOND' | 'END';
  type AlarmDropdownType =
    | 'part'
    | 'target'
    | 'generation'
    | 'targetSelector'
    | 'link';
  type ALARM_STATUS = '전체' | '발송 전' | '발송 후';
  type ADMIN_STATUS =
    | 'SUPER_USER'
    | 'SOPT'
    | 'MAKERS'
    | 'NOT_CERTIFIED'
    | 'DEVELOPER';

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
    link: string;
  }
  interface Alarm {
    alarmId: number;
    part: string | null;
    attribute: string;
    title: string;
    content: string;
    sendAt: string;
    status: string;
  }
  interface AlarmDetail
    extends Omit<PostAlarmData, 'generation' | 'generationAt' | 'targetList'> {
    createdAt: string;
    sendAt: string;
  }
}

export default global;
