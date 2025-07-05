import { z } from 'zod';

import { getImageSize } from '@/components/bannerAdmin/utils/getImageSize';

export const CONTENT_KEY = ['프로덕트 홍보', '기타 홍보', '생일 광고'] as const;
export const CONTENT_VALUE = ['product', 'etc', 'birthday'] as const;
export const contentList = {
  '프로덕트 홍보': 'product',
  '기타 홍보': 'etc',
  '생일 광고': 'birthday',
} as const;

export const LOCATION_KEY = ['커뮤니티', '전체모임', '모임피드'] as const;
export const LOCATION_VALUE = ['pg_community', 'cr_main', 'cr_feed'] as const;
export const locationList = {
  커뮤니티: 'pg_community',
  전체모임: 'cr_main',
  모임피드: 'cr_feed',
} as const;

const MAX_IMAGE_CAPACITY = 0.5;

const ERROR_MESSAGE = {
  REQUIRED_VALUE: '필수 입력값입니다.',
  PUBLISHER_MAX_LENGTH: '30자 이내로 작성해주세요.',
  INVALID_LINK: '유효한 링크를 첨부해주세요.',
  INVALID_IMAGE_SIZE: '이미지 규격이 맞지 않습니다.',
  IMAGE_MAX_CAPACITY: '용량이 5MB 초과입니다.',
  INVALID_IMAGE_TYPE: '이미지가 png 형식이 아닙니다.',
};

export const getPcImageBaseSize = (
  location: (typeof LOCATION_VALUE)[number],
) => {
  switch (location) {
    case 'pg_community':
      return [1824, 328];
    case 'cr_main':
      return [760, 956];
    case 'cr_feed':
      return [760, 760];
  }
};

export const getMoImageBaseSize = (
  location: (typeof LOCATION_VALUE)[number],
) => {
  switch (location) {
    case 'pg_community':
      return [1340, 672];
    case 'cr_main':
      return [760, 190];
    case 'cr_feed':
      return [760, 760];
  }
};

export const bannerSchema = z.object({
  publisher: z
    .string()
    .min(1, { message: ERROR_MESSAGE.REQUIRED_VALUE })
    .max(30, { message: ERROR_MESSAGE.PUBLISHER_MAX_LENGTH }),
  contentType: z.enum(CONTENT_VALUE),
  location: z.enum(LOCATION_VALUE),
  dateRange: z.string().array(),
  link: z
    .string()
    .url({ message: ERROR_MESSAGE.INVALID_LINK })
    .optional()
    .or(z.literal('')),
  pcImageFileName: z
    .object({
      file: z.instanceof(File),
      previewUrl: z.string().url(),
      location: z.enum(LOCATION_VALUE),
    })
    .superRefine(async (file, ctx) => {
      const { width, height } = await getImageSize(file.previewUrl);

      const [baseWidth, baseHeight] = getPcImageBaseSize(file.location);

      if (width !== baseWidth || height !== baseHeight) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ERROR_MESSAGE.INVALID_IMAGE_SIZE,
          path: ['pcImageFileName'],
        });
      }

      if (file.file.size / 1024 / 1024 > MAX_IMAGE_CAPACITY) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ERROR_MESSAGE.IMAGE_MAX_CAPACITY,
          path: ['pcImageFileName'],
        });
      }

      if (file.file.type.split('/').pop() !== 'png') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ERROR_MESSAGE.INVALID_IMAGE_TYPE,
          path: ['pcImageFileName'],
        });
      }
    }),
  mobileImageFileName: z
    .object({
      file: z.instanceof(File),
      previewUrl: z.string().url(),
      location: z.enum(LOCATION_VALUE),
    })
    .superRefine(async (file, ctx) => {
      const { width, height } = await getImageSize(file.previewUrl);

      const [baseWidth, baseHeight] = getMoImageBaseSize(file.location);

      if (width !== baseWidth || height !== baseHeight) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ERROR_MESSAGE.INVALID_IMAGE_SIZE,
          path: ['mobileImageFileName'],
        });
      }

      if (file.file.size / 1024 / 1024 > 0.5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ERROR_MESSAGE.IMAGE_MAX_CAPACITY,
          path: ['mobileImageFileName'],
        });
      }

      if (file.file.type.split('/').pop() !== 'png') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ERROR_MESSAGE.INVALID_IMAGE_TYPE,
          path: ['mobileImageFileName'],
        });
      }
    }),
});

export type BannerFormType = z.infer<typeof bannerSchema>;
