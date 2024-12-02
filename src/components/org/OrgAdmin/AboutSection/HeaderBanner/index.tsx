import { IconInfoCircle } from '@sopt-makers/icons';
import { useFormContext } from 'react-hook-form';

import RequiredIcon from '../../assets/RequiredIcon';
import Modal from '../../common/Modal';
import useModal from '../../common/Modal/useModal';
import MyDropzone from '../../MyDropzone';
import { StDescription, StInputLabel, StTitle, StWrapper } from '../style';
import { StContentWrapper, StInfoButton, StStretchContainer } from './style';

const HeaderBanner = () => {
  const method = useFormContext();
  const { isInfoVisible, onInfoToggle } = useModal();

  return (
    <StStretchContainer>
      <StWrapper>
        <StTitle>
          <span>소개탭 헤더</span>
          <StInfoButton onClick={onInfoToggle}>
            <IconInfoCircle />
          </StInfoButton>
        </StTitle>
        <StContentWrapper>
          <StInputLabel>
            <span>이미지</span>
            <RequiredIcon />
          </StInputLabel>
          <StDescription>
            이미지는 1920*630 크기로 올려주세요. ‘소개’탭 가장 상단에 보여지는
            이미지예요.
          </StDescription>
          <MyDropzone
            method={method}
            label="headerImageFileName"
            width="582px"
            height="191px"
          />
        </StContentWrapper>
      </StWrapper>
      <Modal
        title="소개탭 헤더"
        description="소개탭 가장 상단에 보이는 헤더 이미지예요."
        subDescription="이번 기수의 핵심 가치가 돋보이는 이미지를 넣어주세요."
        imgSrc="/images/org/imgAboutHeaderInfo.png"
        isInfoVisible={isInfoVisible}
        onInfoToggle={onInfoToggle}
      />
    </StStretchContainer>
  );
};

export default HeaderBanner;
