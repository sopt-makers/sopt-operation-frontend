import {
  CONTENT_VALUE,
  LOCATION_VALUE,
} from '@/components/bannerAdmin/types/form';

export interface BannerDetailRequest {
  publisher: string;
  content_type: (typeof CONTENT_VALUE)[number];
  location: (typeof LOCATION_VALUE)[number];
  start_date: string;
  end_date: string;
  link?: string;
  image_pc: File;
  image_mobile: File;
}

export interface BannerDetailResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    status: string;
    publisher: string;
    content_type: (typeof CONTENT_VALUE)[number];
    location: (typeof LOCATION_VALUE)[number];
    start_date: string;
    end_date: string;
    link: string;
    image_url_pc: string;
    image_url_mobile: string;
  };
}
