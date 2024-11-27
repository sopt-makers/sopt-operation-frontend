import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import MyDropzone from '../../MyDropzone';
import IcBehanceLogo from '../assets/IcBehanceLogo';
import IcGithubLogo from '../assets/IcGithubLogo';
import IcLinkedinLogo from '../assets/IcLinkedinLogo';
import IcMailLogo from '../assets/IcMailLogo';
import { StDescription, StInput, StInputLabel } from '../style';
import SNSInput from './SNSInput';
import { StPhotoWrapper, StSNSWrapper } from './style';

interface ExecInfoProps {
  selectedExec: string;
}

const ExecInfo = ({ selectedExec }: ExecInfoProps) => {
  const method = useFormContext();
  const {
    register,
    formState: { errors },
  } = method;

  return (
    <>
      <StPhotoWrapper>
        <StInputLabel>프로필 사진</StInputLabel>
        <StDescription>사진은 1:1 비율로 올려주세요.</StDescription>
        <MyDropzone
          method={method}
          label={`${selectedExec}_profileImageFileName`}
          width="168px"
          height="168px"
          shape="circle"
        />
      </StPhotoWrapper>
      <StInput
        {...register(`${selectedExec}_name`, {
          required: true && VALIDATION_CHECK.required.errorText,
        })}
        isError={errors[`${selectedExec}_name`]?.message !== undefined}
        errorMessage={errors[`${selectedExec}_name`]?.message as string}
        labelText="이름"
        placeholder="ex. 김솝트"
      />
      <StInput
        {...register(`${selectedExec}_affiliation`, {
          required: true && VALIDATION_CHECK.required.errorText,
        })}
        isError={errors[`${selectedExec}_affiliation`]?.message !== undefined}
        errorMessage={errors[`${selectedExec}_affiliation`]?.message as string}
        labelText="소속"
        placeholder="ex. 솝트대학교 / 솝트컴퍼니 / 앱잼 프로덕트명"
      />
      <StInput
        {...register(`${selectedExec}_introduction`, {
          required: true && VALIDATION_CHECK.required.errorText,
        })}
        isError={errors[`${selectedExec}_introduction`]?.message !== undefined}
        errorMessage={errors[`${selectedExec}_introduction`]?.message as string}
        labelText="한 줄 소개"
        placeholder="ex. 새로운 도전을 위해 과감히 용기내는 사람"
      />
      <StSNSWrapper>
        <span>SNS</span>
        <SNSInput
          label={`${selectedExec}_sns_email`}
          icon={IcMailLogo}
          placeholder="ex. 000@sopt.org"
        />
        <SNSInput
          label={`${selectedExec}_sns_linkedin`}
          icon={IcLinkedinLogo}
          placeholder="ex. https://www.linkedin.com/..."
        />
        <SNSInput
          label={`${selectedExec}_sns_github`}
          icon={IcGithubLogo}
          placeholder="ex. https://github.com/..."
        />
        <SNSInput
          label={`${selectedExec}_sns_behance`}
          icon={IcBehanceLogo}
          placeholder="ex. https://www.behance.net/..."
        />
      </StSNSWrapper>
    </>
  );
};

export default ExecInfo;
