export const getBannerType = (bannerStatus: BANNER_STATUS) => {
  if (bannerStatus === 'reserved') return 'primary';
  if (bannerStatus === 'in_progress') return 'secondary';
  if (bannerStatus === 'done') return 'default';
};
