import { partList } from './session';

export const ALARM_TYPE = ['공지', '소식'];

export const TARGET_USER_LIST = ['활동 회원', 'CSV 첨부'];
export const TARGET_GENERATION_LIST = [
  '전체 기수',
  '33기',
  '32기',
  '31기',
  '30기',
];

export const IS_FILE_UPLOAD_LIST = ['대상자 전체', '특정 유저 지정'];

export const LINK_TYPE_LIST = [
  '첨부하지 않음',
  '플레이그라운드 : 멤버',
  '플레이그라운드 : 프로젝트',
  '플레이그라운드 : 크루',
  '공식 홈페이지',
  '출석',
  '솝탬프',
];

export const readPlaygroundId = async (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const userIds: string[] = [];
    const reader = new FileReader();
    let foundColumn = false;

    reader.readAsText(file, 'UTF-8');
    reader.onload = function (evt) {
      try {
        const csv = evt.target?.result as string;
        const lines = csv.split('\n');

        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('[Amplitude] User ID')) {
            foundColumn = true;
            continue;
          }
          if (foundColumn) {
            let value = lines[i].split(',')[0].trim();
            value = value.replace(/^"\t|\t"$|"/g, '').trim();
            if (value) userIds.push(value);
          }
        }
        resolve(userIds);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
};
