'use client';

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { IconImagePlus } from '@sopt-makers/icons';
import { type MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import type { UseFormReturn } from 'react-hook-form';

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
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = method;

  // 수정하기시 서버에서 받아온 url로 previewUrl 설정
  const imageFile = watch(label);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          setValue(
            label,
            {
              file,
              previewUrl: reader.result,
              location: getValues('location'),
            },
            { shouldValidate: true },
          );
          if (getValues('location') === 'cr_feed') {
            setValue(
              'mobileImageFileName',
              {
                file,
                previewUrl: reader.result,
                location: getValues('location'),
              },
              { shouldValidate: true },
            );
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [label, setValue, getValues],
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

  return (
    <StImgButtonWrapper>
      <StImgButton
        {...getRootProps({
          onClick: handleClick,
        })}
        width={width}
        height={height}
        shape={shape}
        isError={!!errors[label]}>
        <input
          {...register(label, {
            required: required && true && VALIDATION_CHECK.required.errorText,
          })}
          {...getInputProps()}
        />
        {imageFile?.previewUrl ? (
          <StImgPreview src={imageFile.previewUrl} alt="에러가 발생했어요." />
        ) : isDragActive ? (
          <p>이미지를 드래그 해주세요...</p>
        ) : (
          <StImgIcon />
        )}
      </StImgButton>
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
