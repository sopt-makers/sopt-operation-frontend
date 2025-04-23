export const precision = (num: number, precisionNum: number) => {
  const numToString = num + '';
  const numLength = numToString.length;

  if (numLength > 2) return num;
  return '0'.repeat(precisionNum - numLength) + numToString;
};

export const addPlus = (num: number) => (num < 0 ? num : `+${num}`);

export const buildQuery = (
  queries: Record<string, string | undefined | null>,
): string => {
  const query = new URLSearchParams();

  Object.entries(queries).forEach(([key, value]) => {
    value && query.append(key, value);
  });

  return query.toString() ? `?${query.toString()}` : '';
};

export const getQuery = (url: string, key: string) => {
  const queryString = `?${url?.split('?')[1]}`;
  const params = new URLSearchParams(queryString);

  return params.get(key) || undefined;
};

export const getTagColor = (location: string) => {
  if (location === 'pg_community') return 'rgba(88, 207, 5, 0.5)';
  if (location === 'cr_main') return 'rgba(0, 174, 255, 0.50)';
  if (location === 'cr_feed') return 'rgba(250, 115, 227, 0.50)';
  if (location === 'org') return 'rgba(255, 193, 7, 0.50)';

  return 'rgba(88, 207, 5, 0.5)';
};

export const translateStatus = (status: string) => {
  switch (status) {
    case 'reserved':
      return '진행 예정';
    case 'in_progress':
      return '진행 중';
    case 'done':
      return '진행 완료';
    default:
      return status;
  }
};

export const translateLocation = (location: string) => {
  switch (location) {
    case 'pg_community':
      return '플그 커뮤니티';
    case 'cr_main':
      return '크루 전체 모임';
    case 'cr_feed':
      return '크루 모임피드';
    case 'org':
      return '공식 홈페이지';
    default:
      return location;
  }
};

export const translateContentType = (contentType: string) => {
  switch (contentType) {
    case 'product':
      return '프로덕트 홍보';
    case 'birthday':
      return '생일 광고';
    case 'etc':
      return '기타 홍보';
    default:
      return contentType;
  }
};

export const getBannerStatus = (tab: BANNER_STATUS) => {
  if (tab === 'all') return '';
  if (tab === 'reserved') return 'reserved';
  if (tab === 'in_progress') return 'in_progress';
  if (tab === 'done') return 'done';
  return '';
};

export const getBannerSort = (filter: string) => {
  if (filter === '시작날짜 빠른 순') return 'start_date';
  if (filter === '종료날짜 빠른 순') return 'end_date';
  return 'status';
};
