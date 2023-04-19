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
  interface Member {
    attendanceId: number;
    attendances: Attendance[];
    member: {
      memberId: number;
      name: string;
      university: string;
    };
    updatedScore: number;
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
    startAt: string; // yyyy-MM-ddThh:mm:ss
    code: string;
  }
  interface Session {
    generation: number;
    lectures: Lecture[];
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
}

export default global;
