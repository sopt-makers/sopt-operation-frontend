export const attendanceInit: Attendance = {
  subAttendanceId: 0,
  round: 0,
  status: 'ABSENT',
  updateAt: '-',
};

export const seminarAttendanceOptions: Array<{
  label: string;
  value: ATTEND_STATUS;
}> = [
  { label: '출석', value: 'ATTENDANCE' },
  { label: '지각', value: 'TARDY' },
  { label: '결석', value: 'ABSENT' },
];

export const eventAttendanceOptions: Array<{
  label: string;
  value: ATTEND_STATUS;
}> = [
  { label: '출석', value: 'ATTENDANCE' },
  { label: '결석', value: 'ABSENT' },
];
