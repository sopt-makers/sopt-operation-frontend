export const attendanceInit: Attendance = {
  subAttendanceId: 0,
  round: 0,
  status: 'ABSENT',
  updateAt: '-',
};

export const scoreDetailAttendanceInit: ScoreDetailAttendance = {
  round: 0,
  status: '결석',
  date: '-',
};

export const subLectureInit: SubLecture = {
  subLectureId: 0,
  round: 0,
  startAt: null,
  code: null,
};

export const attendanceOptions: Record<
  string,
  Array<{
    label: string;
    value: ATTEND_STATUS;
  }>
> = {
  first: [
    { label: '1차 출석', value: 'ATTENDANCE' },
    { label: '1차 결석', value: 'ABSENT' },
  ],
  second: [
    { label: '2차 출석', value: 'ATTENDANCE' },
    { label: '2차 결석', value: 'ABSENT' },
  ],
};
