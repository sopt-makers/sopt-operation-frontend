import React from 'react';
import { StContainer } from '@/components/orgAdmin/ImageSelect/style';

interface Props {
  image: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref: React.MutableRefObject<HTMLInputElement | null>;
}

const ImageSelect = ({ image, onChange, ref }: Props) => {
  return (
    <StContainer>
      {image ? (
        <img
          src={image}
          alt="Uploaded image"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      ) : (
        <>
          <input
            id={'logoFileUpload'}
            type="file"
            accept="image/*"
            onChange={onChange}
            ref={ref}
          />
        </>
      )}
    </StContainer>
  );
};

export default ImageSelect;
