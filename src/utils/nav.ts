import { IcAlarmMenu, IcAttendanceMenu, IcOrgMenu } from '@/assets/icons';

export const MENU_LIST = [
  {
    title: '출석 관리',
    MenuIcon: IcAttendanceMenu,
    subMenu: ['출석 세션', '출석 총점'],
    path: ['/attendanceAdmin/session', '/attendanceAdmin/totalScore'],
  },
  {
    title: '공홈 관리',
    MenuIcon: IcOrgMenu,
    path: ['/orgAdmin/aboutTabManagement'],
  },
  {
    title: '알림 관리',
    MenuIcon: IcAlarmMenu,
    path: ['/alarmAdmin'],
  },
];
