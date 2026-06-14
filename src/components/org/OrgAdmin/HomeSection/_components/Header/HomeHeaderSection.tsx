import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';
import Modal from '@/components/org/OrgAdmin/common/Modal';
import useModal from '@/components/org/OrgAdmin/common/Modal/useModal';
import {
  StInfoButton,
  StTitle,
  StContentWrapper,
  StInputLabel,
  StDescription,
  StHomeHeaderModalWrapper,
  StSectionWrapper,
  StWrapper,
} from '@/components/org/OrgAdmin/HomeSection/style';
import { IconInfoCircle } from '@sopt-makers/icons';
import MyDropzone from '@/components/org/OrgAdmin/MyDropzone';
import { useFormContext } from 'react-hook-form';

const HomeHeaderSection = () => {
  const method = useFormContext();
  const { isInfoVisible, onInfoToggle } = useModal();

  return (
    <StSectionWrapper>
      <StWrapper>
        <StTitle>
          <h2>홈 헤더</h2>
          <StInfoButton onClick={onInfoToggle}>
            <IconInfoCircle />
          </StInfoButton>
        </StTitle>
        <StContentWrapper>
          <StInputLabel>
            <span>홈 헤더 이미지</span>
            <RequiredIcon />
          </StInputLabel>
          <StDescription>
            이미지는 1920*1080 크기로 올려주세요. 메인 홈 가장 상단에 보여지는
            이미지예요.
          </StDescription>
          <MyDropzone
            method={method}
            label="homeHeaderImageFileName"
            width="582px"
            height="327px"
            required
          />
        </StContentWrapper>
      </StWrapper>
      <StHomeHeaderModalWrapper>
        <Modal
          title="홈 헤더"
          description="메인 홈 가장 상단에 보이는 헤더 이미지예요."
          subDescription="SOPT의 열정을 대표할 수 있는 이미지를 넣어보세요."
          imgSrc="/images/org/imgHomeHeader.png"
          isInfoVisible={isInfoVisible}
          onInfoToggle={onInfoToggle}
        />
      </StHomeHeaderModalWrapper>
    </StSectionWrapper>
  );
};

export default HomeHeaderSection;
