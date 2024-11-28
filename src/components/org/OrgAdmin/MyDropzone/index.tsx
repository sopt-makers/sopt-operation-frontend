'use client';

import { type MouseEvent, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import type { UseFormReturn } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import { StErrorMessage } from '../style';
import {
  StImgButton,
  StImgButtonWrapper,
  StImgIcon,
  StImgPreview,
} from './style';

interface MyDropzoneProps {
  method: UseFormReturn;
  label: string;
  width?: string;
  height?: string;
  shape?: 'square' | 'circle';
}

const MyDropzone = ({
  method,
  label,
  width = '547px',
  height = '166px',
  shape = 'square',
}: MyDropzoneProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {
    register,
    setValue,
    formState: { errors },
  } = method;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const sanitizedFileName = file.name
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, '_'); // 띄어쓰기를 언더스코어로 변경

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
          setValue(label, sanitizedFileName, { shouldValidate: true });
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

  return (
    <StImgButtonWrapper>
      <StImgButton
        {...getRootProps({
          onClick: handleClick, // input의 클릭 이벤트 핸들링
        })}
        width={width}
        height={height}
        shape={shape}
        isError={errors[label]?.message != undefined}>
        <input
          {...register(label, {
            required: true && VALIDATION_CHECK.required.errorText,
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
      {errors[label] && (
        <StErrorMessage>
          <>{errors[label].message}</>
        </StErrorMessage>
      )}
    </StImgButtonWrapper>
  );
};

export default MyDropzone;
