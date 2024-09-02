import { IcAlarmMenu, IcAttendanceMenu } from '@/assets/icons';

export const GENERATION_INFO = [
  {
    generation: '35',
    slogan: 'AND',
  },
  {
    generation: '34',
    slogan: 'NOW',
  },
  {
    generation: '33',
    slogan: 'DO',
  },
  {
    generation: '32',

    slogan: 'GO',
  },
];

export const MENU_LIST = [
  {
    title: '출석 관리',
    MenuIcon: IcAttendanceMenu,
    subMenu: ['출석 세션', '출석 총점'],
    path: ['/attendanceAdmin/session', '/attendanceAdmin/totalScore'],
  },
  // {
  //   title: '공홈 관리',
  //   MenuIcon: IcOrgMenu,
  //   path: ['/orgAdmin/aboutTabManagement'],
  // },
  {
    title: '알림 관리',
    MenuIcon: IcAlarmMenu,
    path: ['/alarmAdmin'],
  },
];
