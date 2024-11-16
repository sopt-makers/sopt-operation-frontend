import { Chip } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

import { PART_LIST, 임원진_LIST } from '@/utils/org';

import MyDropzone from '../../MyDropzone';
import IcBehanceLogo from '../assets/IcBehanceLogo';
import IcGithubLogo from '../assets/IcGithubLogo';
import IcLinkedinLogo from '../assets/IcLinkedinLogo';
import IcMailLogo from '../assets/IcMailLogo';
import {
  StDescription,
  StInput,
  StInputLabel,
  StTitle,
  StWrapper,
} from '../style';
import {
  StChipLabel,
  StChipLine,
  StChipWrapper,
  StPhotoWrapper,
  StSNSBox,
  StSNSWrapper,
} from './style';

const Executives = () => {
  const method = useFormContext();
  return (
    <StWrapper>
      <StTitle>임원진</StTitle>
      <StChipWrapper>
        <StChipLine>
          <StChipLabel>임원진</StChipLabel>
          {임원진_LIST.map((role) => (
            <Chip key={role}>{role}</Chip>
          ))}
        </StChipLine>
        <StChipLine>
          <StChipLabel>파트장</StChipLabel>
          {PART_LIST.map((part) => (
            <Chip key={part}>{`${part} 파트장`}</Chip>
          ))}
        </StChipLine>
      </StChipWrapper>
      <StPhotoWrapper>
        <StInputLabel>프로필 사진</StInputLabel>
        <StDescription>사진은 1:1 비율로 올려주세요.</StDescription>
        <MyDropzone
          method={method}
          label="aboutExecutivesProfile"
          width="168px"
          height="168px"
          shape="circle"
        />
      </StPhotoWrapper>
      <StInput labelText="이름" placeholder="ex. 김솝트" value={''} />
      <StInput
        labelText="소속"
        placeholder="ex. 솝트대학교 / 솝트컴퍼니 / 앱잼 프로덕트명"
        value={''}
      />
      <StInput
        labelText="한 줄 소개"
        placeholder="ex. 새로운 도전을 위해 과감히 용기내는 사람"
        value={''}
      />
      <StSNSWrapper>
        <span>SNS</span>
        <StSNSBox>
          <IcMailLogo />
          <StInput placeholder="ex. 000@sopt.org" value={''} />
        </StSNSBox>
        <StSNSBox>
          <IcLinkedinLogo />
          <StInput placeholder="ex. https://www.linkedin.com/..." value={''} />
        </StSNSBox>
        <StSNSBox>
          <IcGithubLogo />
          <StInput placeholder="ex. https://github.com/..." value={''} />
        </StSNSBox>
        <StSNSBox>
          <IcBehanceLogo />
          <StInput placeholder="ex. https://www.behance.net/..." value={''} />
        </StSNSBox>
      </StSNSWrapper>
    </StWrapper>
  );
};

export default Executives;
