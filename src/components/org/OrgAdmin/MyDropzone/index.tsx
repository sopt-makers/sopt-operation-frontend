'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { StImgButton, StImgIcon, StImgPreview } from './style';

const MyDropzone: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
    },
  });

  return (
    <StImgButton {...getRootProps()}>
      <input {...getInputProps()} />
      {previewUrl ? (
        <StImgPreview src={previewUrl} alt="공홈 지원하기 탭 헤더 이미지" />
      ) : isDragActive ? (
        <p>이미지를 드래그 해주세요...</p>
      ) : (
        <StImgIcon />
      )}
    </StImgButton>
  );
};

export default MyDropzone;
