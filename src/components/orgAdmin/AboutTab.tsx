import PartFilter from '@/components/common/PartFilter';
import {StLayout, StContent, StLogo} from '@/components/orgAdmin/style';
import React, { ChangeEvent, useRef, useState } from 'react';



function ImageUpload(props: {
  image: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref: React.MutableRefObject<HTMLInputElement | null>;
}) {
  return (
    <StLogo>
      {props.image ? (
        <img
          src={props.image}
          alt="Uploaded image"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      ) : (
        <>
          <input
            id={'logoFileUpload'}
            type="file"
            accept="image/*"
            onChange={props.onChange}
            ref={props.ref}
          />
        </>
      )}
    </StLogo>
  );
}

const AboutTab = () => {
  const [selectedPart, setSelectedPart] = useState<PART>('ALL');
  const [image, setImage] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      }
    };
  };
  const onChangePart = (part: PART) => {
    setSelectedPart(part);
  };
  return (
    <StLayout>
      <h1>ABOUT 탭</h1>
      <StContent>
        <h2>썸네일</h2>
        <p>image(옆에 이미지 사이즈 기재 필요)</p>
        <ImageUpload
          image={image}
          onChange={handleImageChange}
          ref={logoInputRef}
        />

        <p>Title</p>
      </StContent>
      <StContent>
        <h2>핵심가치</h2>
        <p>image(옆에 이미지 사이즈 기재 필요)</p>
      </StContent>
      <StContent>
        <h2>모집파트 & 커리큘럼</h2>
        <PartFilter selected={selectedPart} onChangePart={onChangePart} />
      </StContent>
      <StContent>
        <h2>활동내용</h2>
        <PartFilter selected={selectedPart} onChangePart={onChangePart} />
      </StContent>
      <StContent>
        <p>image(옆에 이미지 사이즈 기재 필요)</p>
        <p>Title</p>
        <p>Sub title</p>
      </StContent>
    </StLayout>
  );
};

export default AboutTab;
