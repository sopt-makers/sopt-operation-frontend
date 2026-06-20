'use client';

import { type MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { type UseFormReturn, useWatch } from 'react-hook-form';

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
  required?: boolean;
  disabled?: boolean;
}

const MyDropzone = ({
  method,
  label,
  width = '547px',
  height = '166px',
  shape = 'square',
  required,
  disabled = false,
}: MyDropzoneProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = method;
  const storedData = useWatch({ control, name: label });

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
            { shouldValidate: true, shouldDirty: true },
          );
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
    disabled,
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
    },
  });

  useEffect(() => {
    if (storedData?.previewUrl) {
      setPreviewUrl(storedData.previewUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [storedData?.previewUrl]);

  return (
    <StImgButtonWrapper>
      <StImgButton
        {...getRootProps({
          onClick: handleClick, // input의 클릭 이벤트 핸들링
        })}
        width={width}
        height={height}
        shape={shape}
        isError={errorMsg}
        isDisabled={disabled}>
        <input
          {...register(label, {
            required: required && true && VALIDATION_CHECK.required.errorText,
          })}
          {...getInputProps()}
          disabled={disabled}
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

export default MyDropzone;
