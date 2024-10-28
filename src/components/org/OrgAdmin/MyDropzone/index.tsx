'use client';

import { useCallback, useState } from 'react';
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
}

const MyDropzone = ({ method, label }: MyDropzoneProps) => {
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
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
          setValue(label, reader.result, { shouldValidate: true });
        };
        reader.readAsDataURL(file);
      }
    },
    [label, setValue],
  );

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
      <StImgButton {...getRootProps()}>
        <input
          {...register(label, {
            required: true && VALIDATION_CHECK.required.errorText,
          })}
          {...getInputProps()}
        />
        {previewUrl ? (
          <StImgPreview src={previewUrl} alt="공홈 지원하기 탭 헤더 이미지" />
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
