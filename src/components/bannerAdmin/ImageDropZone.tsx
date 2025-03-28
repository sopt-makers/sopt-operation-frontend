'use client';

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { IconImagePlus } from '@sopt-makers/icons';
import { type MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import type { UseFormReturn } from 'react-hook-form';

import { StErrorMessage } from '@/components/org/OrgAdmin/style';
import { VALIDATION_CHECK } from '@/utils/org';

interface MyDropzoneProps {
  method: UseFormReturn;
  label: string;
  width?: string;
  height?: string;
  shape?: 'square' | 'circle';
  required?: boolean;
}

const ImageDropZone = ({
  method,
  label,
  width = '547px',
  height = '166px',
  shape = 'square',
  required,
}: MyDropzoneProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    setValue,
    watch,
    getValues,
    trigger,
    formState: { errors },
  } = method;

  const errorMsg = label.includes('.')
    ? label.split('.').length === 2
      ? (errors as any)?.[label.split('.')[0]]?.[label.split('.')[1]]?.message
      : (errors as any)?.[label.split('.')[0]]?.[label.split('.')[1]]?.[
          label.split('.')[2]
        ]?.message
    : errors[label]?.message;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const sanitizedFileName = file.name
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, '_'); // 띄어쓰기를 언더스코어로 변경

        const reader = new FileReader();
        reader.onloadend = async () => {
          setPreviewUrl(reader.result as string);
          setValue(
            label,
            { fileName: sanitizedFileName, file, previewUrl: reader.result },
            { shouldValidate: true },
          );
          // console.log(await getImageSize(reader.result as string));
        };
        reader.readAsDataURL(file);
      }
    },
    [label, setValue],
  );

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
    },
  });

  useEffect(() => {
    const storedData = watch(label);

    if (storedData?.previewUrl) {
      setPreviewUrl(storedData.previewUrl);
      trigger(label);
    }
  }, [label, watch]);
  return (
    <StImgButtonWrapper>
      <StImgButton
        {...getRootProps({
          onClick: handleClick, // input의 클릭 이벤트 핸들링
        })}
        width={width}
        height={height}
        shape={shape}
        isError={errorMsg}>
        <input
          {...register(label, {
            required: required && true && VALIDATION_CHECK.required.errorText,
          })}
          {...getInputProps()}
        />
        {previewUrl ? (
          <StImgPreview src={previewUrl} alt="에러가 발생했어요." />
        ) : isDragActive ? (
          <p>이미지를 드래그 해주세요...</p>
        ) : (
          <StImgIcon />
        )}
      </StImgButton>
      {errorMsg && (
        <StErrorMessage>
          <>{errorMsg}</>
        </StErrorMessage>
      )}
    </StImgButtonWrapper>
  );
};

export default ImageDropZone;

export const StImgButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface StImgButtonProps {
  isError: boolean;
  width: string;
  height: string;
  shape: 'square' | 'circle';
}

export const StImgButton = styled.div<StImgButtonProps>`
  ${fontsObject.BODY_4_13_M}

  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-top: 13px;

  color: ${colors.white};
  background-color: ${colors.gray700};
  border: ${({ isError }) => (isError ? `1px solid ${colors.error}` : 'none')};
  border-radius: ${({ shape }) => (shape === 'square' ? '10px' : '50%')};
  cursor: pointer;
  overflow: hidden;
`;

export const StImgIcon = styled(IconImagePlus)`
  width: 24px;
  height: 24px;
  color: ${colors.white};
`;

export const StImgPreview = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: contain;
  color: ${colors.white};
  border-radius: 10px;
`;
