import { z } from 'zod';

export const contentList = {
  '프로덕트 홍보': 'product',
  '기타 홍보': 'etc',
  '생일 광고': 'birthday',
} as const;

export const locationList = {
  커뮤니티: 'pg_community',
  전체모임: 'cr_main',
  모임피드: 'cr_feed',
} as const;

export const CONTENT_LIST = [
  '프로덕트 홍보',
  '기타 홍보',
  '생일 광고',
] as const;

export const LOCATION_LIST = ['커뮤니티', '전체모임', '모임피드'] as const;

const MAX_IMAGE_CAPACITY = 0.5;

const ERROR_MESSAGE = {
  REQUIRED_VALUE: '필수 입력값입니다.',
  PUBLISHER_MAX_LENGTH: '30자 이내로 작성해주세요.',
  INVALID_LINK: '유효한 링크를 첨부해주세요.',
  INVALID_IMAGE_SIZE: '이미지 규격이 맞지 않습니다.',
  IMAGE_MAX_CAPACITY: '용량이 5MB 초과입니다.',
  INVALID_IMAGE_TYPE: '이미지가 png 형식이 아닙니다.',
};

interface ImgSize {
  width: number;
  height: number;
}

const getImageSize = async (url: string): Promise<ImgSize> => {
  return new Promise((res) => {
    const img = new Image();

    img.src = url;

    img.onload = () => {
      const { width, height } = img;

      const size: ImgSize = { width, height };

      res(size);
    };
  });
};

export const getPcImageBaseSize = (
  location: (typeof LOCATION_LIST)[number],
) => {
  switch (location) {
    case '커뮤니티':
      return [1824, 328];
    case '전체모임':
      return [760, 956];
    case '모임피드':
      return [760, 760];
  }
};

export const getMoImageBaseSize = (
  location: (typeof LOCATION_LIST)[number],
) => {
  switch (location) {
    case '커뮤니티':
      return [1340, 627];
    case '전체모임':
      return [760, 190];
    case '모임피드':
      return [];
  }
};

export const bannerSchema = z.object({
  publisher: z
    .string()
    .min(1, { message: ERROR_MESSAGE.REQUIRED_VALUE })
    .max(30, { message: ERROR_MESSAGE.PUBLISHER_MAX_LENGTH }),
  contentType: z.enum(CONTENT_LIST),
  location: z.enum(LOCATION_LIST),
  dateRange: z.string().array(),
  link: z.string().url({ message: ERROR_MESSAGE.INVALID_LINK }),
  pcImageFileName: z
    .object({
      fileName: z.string(),
      file: z.instanceof(File),
      previewUrl: z.string().url(),
      location: z.enum(LOCATION_LIST),
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
      fileName: z.string(),
      file: z.instanceof(File),
      previewUrl: z.string().url(),
      location: z.enum(LOCATION_LIST),
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
