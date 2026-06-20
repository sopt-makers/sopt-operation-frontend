import { IconInfoCircle } from '@sopt-makers/icons';
import { useFormContext } from 'react-hook-form';

import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';
import Modal from '@/components/org/OrgAdmin/common/Modal';
import useModal from '@/components/org/OrgAdmin/common/Modal/useModal';
import MyDropzone from '@/components/org/OrgAdmin/MyDropzone';
import {
  StInfoButton,
  StLabelWrapper,
  StModalWrapper,
  StSectionWrapper,
  StStretchContainer,
} from '@/components/org/OrgAdmin/RecruitSection/style';
import {
  StDescription,
  StLabel,
  StTitle,
  StTitleWrapper,
} from '@/components/org/OrgAdmin/style';

const HeaderSection = () => {
  const method = useFormContext();
  const { isInfoVisible, onInfoToggle } = useModal();

  return (
    <StSectionWrapper>
      <StStretchContainer>
        <StTitleWrapper>
          <StTitle>
            <span>모집안내 탭 헤더</span>
            <StInfoButton onClick={onInfoToggle}>
              <IconInfoCircle />
            </StInfoButton>
          </StTitle>
          <StLabelWrapper>
            <StLabel>이미지</StLabel>
            <RequiredIcon />
          </StLabelWrapper>
          <StDescription>
            이미지는 1920*580 크기로 올려주세요. ‘모집안내’ 탭 가장 상단에
            보여지는 이미지예요.
          </StDescription>
          <MyDropzone method={method} label="recruitHeaderImage" required />
        </StTitleWrapper>
      </StStretchContainer>
      <StModalWrapper>
        <Modal
          title="모집안내 탭 헤더"
          description="서류 접수 기간에만 보이는, 모집안내 탭 가장 상단의 이미지예요."
          subDescription="서류 접수 기간이 아닐 시, 모집 알림 신청을 위한 메일 작성 입력창이 보여요."
          imgSrc="/images/org/imgRecruitHeaderInfo.png"
          isInfoVisible={isInfoVisible}
          onInfoToggle={onInfoToggle}
        />
      </StModalWrapper>
    </StSectionWrapper>
  );
};

export default HeaderSection;
