export const getBannerStatus = (bannerStatus: BANNER_STATUS) => {
  if (bannerStatus === 'RESERVED') return '진행 예정';
  if (bannerStatus === 'IN_PROGRESS') return '진행중';
  if (bannerStatus === 'DONE') return '진행 완료';
};
