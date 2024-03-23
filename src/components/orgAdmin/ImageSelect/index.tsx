// import Image from 'next/image';
import React, { useRef } from 'react';

import { StImageSelect } from '@/components/orgAdmin/ImageSelect/style';

interface Props {
  image: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  width: number;
  height: number;
  priority?: boolean;
}

function ImageSelect({
  image,
  onChange,
  onRemoveImage,
  width,
  height,
  priority = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null!);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current?.click();
    }
  };

  return (
    <StImageSelect hasImage={!!image} onClick={handleClick}>
      {image ? (
        <>
          <img src={image} alt="Uploaded image" width={width} height={height} />
          {/* <Image
            src={image}
            alt="Uploaded image"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            width={width}
            height={height}
            priority={priority}
          /> */}
          <button onClick={onRemoveImage}> X </button>
        </>
      ) : (
        <>
          클릭하여 이미지 업로드
          <input
            ref={inputRef}
            hidden
            className={'input-field'}
            id={'logoFileUpload'}
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            onChange={onChange}
          />
        </>
      )}
    </StImageSelect>
  );
}

export default ImageSelect;
