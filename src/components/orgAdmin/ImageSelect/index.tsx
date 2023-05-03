import React, { useRef } from 'react';

import { StContainer } from '@/components/orgAdmin/ImageSelect/style';

interface Props {
  image: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

const ImageSelect = ({ image, onChange, onRemoveImage }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current?.click();
    }
  };

  return (
    <StContainer onClick={handleClick}>
      {image ? (
        <>
          <img
            src={image}
            alt="Uploaded image"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
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
    </StContainer>
  );
};

export default ImageSelect;
