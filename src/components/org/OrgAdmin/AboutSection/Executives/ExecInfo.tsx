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
          label={`member.${selectedExec}.profileImageFileName`}
          width="168px"
          height="168px"
          shape="circle"
        />
      </StPhotoWrapper>
      <StInput
        {...register(`member.${selectedExec}.name`, {
          // required: true && VALIDATION_CHECK.required.errorText,
        })}
        isError={errors.member?.selectedExec?.name?.message !== undefined}
        errorMessage={errors.member?.selectedExec?.name?.message as string}
        labelText="이름"
        placeholder="ex. 김솝트"
      />
      <StInput
        {...register(`member.${selectedExec}.affiliation`, {
          // required: true && VALIDATION_CHECK.required.errorText,
        })}
        isError={
          errors.member?.selectedExec?.affiliation?.message !== undefined
        }
        errorMessage={
          errors.member?.selectedExec?.affiliation?.message as string
        }
        labelText="소속"
        placeholder="ex. 솝트대학교 / 솝트컴퍼니 / 앱잼 프로덕트명"
      />
      <StInput
        {...register(`member.${selectedExec}.introduction`, {
          // required: true && VALIDATION_CHECK.required.errorText,
        })}
        isError={
          errors.member?.selectedExec?.introduction?.message !== undefined
        }
        errorMessage={
          errors.member?.selectedExec?.introduction?.message as string
        }
        labelText="한 줄 소개"
        placeholder="ex. 새로운 도전을 위해 과감히 용기내는 사람"
      />
      <StSNSWrapper>
        <span>SNS</span>
        <SNSInput
          label={`member.${selectedExec}.sns.email`}
          icon={IcMailLogo}
          placeholder="ex. 000@sopt.org"
        />
        <SNSInput
          label={`member.${selectedExec}.sns.linkedin`}
          icon={IcLinkedinLogo}
          placeholder="ex. https://www.linkedin.com/..."
        />
        <SNSInput
          label={`member.${selectedExec}.sns.github`}
          icon={IcGithubLogo}
          placeholder="ex. https://github.com/..."
        />
        <SNSInput
          label={`member.${selectedExec}.sns.behance`}
          icon={IcBehanceLogo}
          placeholder="ex. https://www.behance.net/..."
        />
      </StSNSWrapper>
    </>
  );
};

export default ExecInfo;
