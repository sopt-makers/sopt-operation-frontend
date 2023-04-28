import PartFilter from '@/components/common/PartFilter';
import {
  StLayout,
  StContent,
} from '@/components/orgAdmin/AboutTab/AboutTabManagement/style';
import React, { ChangeEvent, useRef, useState } from 'react';
import TextField from '@/components/orgAdmin/TextField';
import ImageSelect from '@/components/orgAdmin/ImageSelect';
import { CoreValueInput } from '@/components/orgAdmin/AboutTab/AboutTabManagement/CoreValueInput';

const AboutTabManagement = () => {
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
        <p>image (1920 * 630)</p>
        <div className={'form_container'}>
          <ImageSelect
            image={image}
            onChange={handleImageChange}
            ref={logoInputRef}
          />
        </div>

        <p>Title</p>
        <div className={'form_container'}>
          <TextField label={'ex. 32기 GO SOPT 소개'} />
        </div>
      </StContent>
      <StContent>
        <h2>핵심가치</h2>
        <p>image (380 * 380)</p>
        <CoreValueInput
          image={image}
          onChange={handleImageChange}
          ref={logoInputRef}
        />
        <CoreValueInput
          image={image}
          onChange={handleImageChange}
          ref={logoInputRef}
        />
        <CoreValueInput
          image={image}
          onChange={handleImageChange}
          ref={logoInputRef}
        />
      </StContent>
      <StContent>
        <h2>모집파트 & 커리큘럼</h2>
        <div className={'form_container'}>
          <PartFilter selected={selectedPart} onChangePart={onChangePart} />
        </div>
        <p>image (1200 * 600)</p>
        <div className={'form_container'}>
          <ImageSelect
            image={image}
            onChange={handleImageChange}
            ref={logoInputRef}
          />
        </div>
      </StContent>
    </StLayout>
  );
};

export default AboutTabManagement;
