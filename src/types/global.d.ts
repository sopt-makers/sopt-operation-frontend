declare global {
  type ATTEND_STATUS = 'ATTENDANCE' | 'ABSENT' | 'TARDY';
  type PART = 'ALL' | 'PLAN' | 'DESIGN' | 'WEB' | 'ANDROID' | 'IOS' | 'SERVER';
  type SESSION_TYPE = 'SEMINAR' | 'EVENT' | 'ETC';

  /* 에러 */
  interface ProjectError {
    success: boolean;
    message: string;
  }

  /* 회원 정보 */
  interface Attendance {
    round: number;
    status: ATTEND_STATUS;
    date: string;
  }
  interface Member {
    name: string;
    university: string;
    attendances: Attendance[];
    score: number;
  }

  /* 출석 세션 */
  interface SessionBase {
    part: PART;
    name: string;
    place: string;
    startTime: string; // yyyy/MM/dd HH:mm
    endTime: string; // yyyy/MM/dd HH:mm
    attribute: SESSION_TYPE;
  }
  interface Lecture {
    name: string;
    partValue: PART;
    partName: string;
    date: string; // yyyy/MM/dd
    attribute: SESSION_TYPE;
    attributeName: string;
    status: {
      attendance: number;
      absent: number;
      tardy: number;
      unknown: number;
    };
  }
  interface Session {
    generation: number;
    lectures: Lecture[];
  }
  interface SessionDetail {
    name: string;
    generation: number;
    part: PART;
    attribute: SESSION_TYPE;
    members: Member[];
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
}

export default global;
