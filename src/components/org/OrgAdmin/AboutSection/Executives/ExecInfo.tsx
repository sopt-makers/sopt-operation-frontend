import { UseFormReturn } from 'react-hook-form';

import MyDropzone from '../../MyDropzone';
import IcBehanceLogo from '../assets/IcBehanceLogo';
import IcGithubLogo from '../assets/IcGithubLogo';
import IcLinkedinLogo from '../assets/IcLinkedinLogo';
import IcMailLogo from '../assets/IcMailLogo';
import { StDescription, StInput, StInputLabel } from '../style';
import SNSInput from './SNSInput';
import { StPhotoWrapper, StSNSWrapper } from './style';

interface ExecInfoProps {
  method: UseFormReturn;
  selectedExec: string;
}

const ExecInfo = ({ method, selectedExec }: ExecInfoProps) => {
  const { register } = method;

  return (
    <>
      <StPhotoWrapper>
        <StInputLabel>프로필 사진</StInputLabel>
        <StDescription>사진은 1:1 비율로 올려주세요.</StDescription>
        <MyDropzone
          method={method}
          label={`${selectedExec}.profileImageFileName`}
          width="168px"
          height="168px"
          shape="circle"
        />
      </StPhotoWrapper>
      <StInput
        {...register(`${selectedExec}.name`)}
        labelText="이름"
        placeholder="ex. 김솝트"
      />
      <StInput
        {...register(`${selectedExec}.affiliation`)}
        labelText="소속"
        placeholder="ex. 솝트대학교 / 솝트컴퍼니 / 앱잼 프로덕트명"
      />
      <StInput
        {...register(`${selectedExec}.introduction`)}
        labelText="한 줄 소개"
        placeholder="ex. 새로운 도전을 위해 과감히 용기내는 사람"
      />
      <StSNSWrapper>
        <span>SNS</span>
        <SNSInput
          method={method}
          label={`${selectedExec}.sns.email`}
          icon={IcMailLogo}
          placeholder="ex. 000@sopt.org"
        />
        <SNSInput
          method={method}
          label={`${selectedExec}.sns.linkedin`}
          icon={IcLinkedinLogo}
          placeholder="ex. https://www.linkedin.com/..."
        />
        <SNSInput
          method={method}
          label={`${selectedExec}.sns.github`}
          icon={IcGithubLogo}
          placeholder="ex. https://github.com/..."
        />
        <SNSInput
          method={method}
          label={`${selectedExec}.sns.behance`}
          icon={IcBehanceLogo}
          placeholder="ex. https://www.behance.net/..."
        />
      </StSNSWrapper>
    </>
  );
};

export default ExecInfo;
