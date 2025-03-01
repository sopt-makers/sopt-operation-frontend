import { IconInfoCircle } from '@sopt-makers/icons';
import { useFormContext } from 'react-hook-form';

import RequiredIcon from '../assets/RequiredIcon';
import Modal from '../common/Modal';
import useModal from '../common/Modal/useModal';
import MyDropzone from '../MyDropzone';
import {
  StDescription,
  StLabel,
  StTitle,
  StTitleWrapper,
  StWrapper,
} from '../style';
import { StInfoButton, StLabelWrapper, StStretchContainer } from './style';

const Header = () => {
  const method = useFormContext();
  const { isInfoVisible, onInfoToggle } = useModal();

  return (
    <StStretchContainer>
      <StTitleWrapper>
        <StTitle>
          <span>지원하기탭 헤더</span>
          <StInfoButton onClick={onInfoToggle}>
            <IconInfoCircle />
          </StInfoButton>
        </StTitle>
        <StLabelWrapper>
          <StLabel>이미지</StLabel>
          <RequiredIcon />
        </StLabelWrapper>
        <StDescription>
          이미지는 1920*580 크기로 올려주세요. ‘지원하기’탭 가장 상단에 보여지는
          이미지예요.
        </StDescription>
        <MyDropzone method={method} label="recruitHeaderImage" required />
      </StTitleWrapper>
      <Modal
        title="지원하기탭 헤더"
        description="지원 가능 기간에만 보이는, 지원하기탭 가장 상단의 이미지예요."
        subDescription="지원 기간이 아닐시, 알림신청을 위한 메일 작성 입력창이 보여요."
        imgSrc="/images/org/imgRecruitHeaderInfo.png"
        isInfoVisible={isInfoVisible}
        onInfoToggle={onInfoToggle}
      />
    </StStretchContainer>
  );
};

export default Header;
