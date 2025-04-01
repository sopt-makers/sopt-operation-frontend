import { contentList, locationList } from '@/components/bannerAdmin/types/form';

export interface BannerType {
  publisher: string;
  content_type: (typeof contentList)[keyof typeof contentList];
  location: (typeof locationList)[keyof typeof locationList];
  start_date: string;
  end_date: string;
  link: string;
  image_pc: File;
  image_mobile: File;
}
