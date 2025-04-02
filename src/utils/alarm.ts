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

export const ALARM_STATUS_LIST: ALARM_STATUS[] = [
  'ALL',
  'SCHEDULED',
  'COMPLETED',
];

export const BANNER_STATUS_LIST: BANNER_STATUS[] = [
  'ALL',
  'RESERVED',
  'IN_PROGRESS',
  'DONE',
];

export const readPlaygroundId = async (file: File): Promise<string[]> => {
  // 파일 크기 체크
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_FILE_SIZE) {
    alert('파일 크기는 5MB를 초과할 수 없습니다.');
    throw new Error('파일 크기는 5MB를 초과할 수 없습니다.');
  }

  return new Promise((resolve, reject) => {
    const userIds: string[] = [];
    const reader = new FileReader();

    reader.readAsText(file, 'UTF-8');
    reader.onload = function (evt) {
      try {
        const csv = evt.target?.result as string;
        const lines = csv.split('\n');

        // 빈 파일 체크
        if (lines.length < 2) {
          const errorMessage = '유효하지 않은 CSV 파일입니다.';
          alert(errorMessage);
          throw new Error(errorMessage);
        }

        // 헤더 찾기
        const headerIndex = lines.findIndex((line) =>
          line.toLowerCase().includes('user_id'),
        );

        if (headerIndex === -1) {
          const errorMessage = 'user_id 컬럼을 찾을 수 없습니다.';
          alert(errorMessage);
          throw new Error(errorMessage);
        }

        // 데이터 파싱
        for (let i = headerIndex + 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const value = line
            .split(',')[0]
            .replace(/^"|"$/g, '') // 따옴표 제거
            .replace(/^\t|\t$/g, '') // 탭 제거
            .trim();

          if (value) userIds.push(value);
        }

        if (userIds.length === 0) {
          const errorMessage = '유효한 user_id가 없습니다.';
          alert(errorMessage);
          throw new Error(errorMessage);
        }

        resolve(userIds);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => {
      alert('파일을 읽는 중 오류가 발생했습니다.');
      reject(error);
    };
  });
};
