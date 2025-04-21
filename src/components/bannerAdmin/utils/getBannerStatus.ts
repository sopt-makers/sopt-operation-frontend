export const getBannerStatus = (bannerStatus: BANNER_STATUS) => {
  if (bannerStatus === 'reserved') return '진행 예정';
  if (bannerStatus === 'in_progress') return '진행중';
  if (bannerStatus === 'done') return '진행 완료';
};
