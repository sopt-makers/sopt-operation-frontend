import React from 'react';
import { StContainer } from '@/components/orgAdmin/ImageSelect/style';

interface Props {
  image: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage?: () => void;
}

const ImageSelect = ({ image, onChange, onRemoveImage }: Props) => {
  return (
    <StContainer>
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
          <input
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
