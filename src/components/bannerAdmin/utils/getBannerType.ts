export const getBannerType = (bannerStatus: BANNER_STATUS) => {
  if (bannerStatus === 'RESERVED') return 'primary';
  if (bannerStatus === 'IN_PROGRESS') return 'secondary';
  if (bannerStatus === 'DONE') return 'default';
};
