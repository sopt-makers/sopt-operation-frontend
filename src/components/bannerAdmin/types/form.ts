import { z } from 'zod';

export const CONTENT_LIST = [
  '프로덕트 홍보',
  '기타 홍보',
  '생일 광고',
] as const;

export const LOCATION_LIST = ['커뮤니티', '전체모임', '모임피드'] as const;

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
    .min(1)
    .max(30, { message: '30자 이내로 작성해주세요.' }),
  contentType: z.enum(CONTENT_LIST),
  location: z.enum(LOCATION_LIST),
  dateRange: z.string().array(),
  link: z.string().url({ message: '유효한 링크를 첨부해주세요.' }),
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
          message: '이미지 규격이 맞지 않습니다.',
          path: ['pcImageFileName'],
        });
      }

      if (file.file.size / 1024 / 1024 > 0.5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '용량이 5MB 초과입니다.',
          path: ['pcImageFileName'],
        });
      }

      if (file.file.type.split('/').pop() !== 'png') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '이미지가 png 형식이 아닙니다.',
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
          message: '이미지 규격이 맞지 않습니다.',
          path: ['mobileImageFileName'],
        });
      }

      if (file.file.size / 1024 / 1024 > 0.5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '용량이 5MB 초과입니다.',
          path: ['mobileImageFileName'],
        });
      }

      if (file.file.type.split('/').pop() !== 'png') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '이미지가 png 형식이 아닙니다.',
          path: ['mobileImageFileName'],
        });
      }
    }),
});

export type BannerType = z.infer<typeof bannerSchema>;
