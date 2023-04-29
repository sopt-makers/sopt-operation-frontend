declare global {
  type ATTEND_STATUS = 'ATTENDANCE' | 'ABSENT' | 'TARDY';
  type PART = 'ALL' | 'PLAN' | 'DESIGN' | 'WEB' | 'ANDROID' | 'IOS' | 'SERVER';
  type SESSION_TYPE = 'SEMINAR' | 'EVENT' | 'ETC';

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
    status: string;
    date: string;
  }
  interface SessionMember {
    attendanceId: number;
    attendances: Attendance[];
    member: {
      memberId: number;
      name: string;
      university: string;
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
      status: string;
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
    date: string; // yyyy/MM/dd
    attributeValue: SESSION_TYPE;
    attributeName: string;
    status: {
      attendance: number;
      absent: number;
      tardy: number;
      unknown: number;
    };
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
    result: {
      attendance: number;
      absent: number;
      tardy: number;
      unknown: number;
    };
  }

  /* 어드민 */
  interface User {
    id: number;
    name: string;
  }

  /* 로그인 */
  interface AuthHeader {
    Authorization: string;
  }
  interface LoginData {
    email: string;
    password: string;
  }
  interface LoginRes extends User {
    accessToken: string;
  }

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
}
export default global;
