import PartFilter from '@/components/common/PartFilter';
import {
  StLayout,
  StContent,
  StCoreValueLogo,
} from '@/components/orgAdmin/AboutTab/AboutTabManagement/style';
import React, { ChangeEvent, useRef, useState } from 'react';
import TextField from '@/components/orgAdmin/TextField';
import ImageSelect from '@/components/orgAdmin/ImageSelect';

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
        <StCoreValueLogo>
          <ImageSelect
            image={image}
            onChange={handleImageChange}
            ref={logoInputRef}
          />
          <ImageSelect
            image={image}
            onChange={handleImageChange}
            ref={logoInputRef}
          />
          <ImageSelect
            image={image}
            onChange={handleImageChange}
            ref={logoInputRef}
          />
        </StCoreValueLogo>
      </StContent>
      <StContent>
        <h2>모집파트 & 커리큘럼</h2>
        <div className={'form_container'}>
          <PartFilter selected={selectedPart} onChangePart={onChangePart} />
        </div>
        <div className={'form_container'}>
          <ImageSelect
            image={image}
            onChange={handleImageChange}
            ref={logoInputRef}
          />
        </div>
      </StContent>
      <StContent>
        <h2>활동내용</h2>
        <PartFilter selected={selectedPart} onChangePart={onChangePart} />
      </StContent>
      <StContent>
        <p>Title</p>
        <div className={'form_container'}>
          <TextField label={'ex. 정기 세미나'} />
        </div>
        <p>Sub title</p>
        <div className={'form_container'}>
          <TextField label={'ex. 2023년 4월 ~ 6월'} />
        </div>
        <p>image(옆에 이미지 사이즈 기재 필요)</p>
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
