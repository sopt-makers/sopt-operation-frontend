import { Chip } from '@sopt-makers/ui';
import { useState } from 'react';
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
import SNSInput from './SNSInput';
import {
  StChipLabel,
  StChipLine,
  StChipWrapper,
  StPhotoWrapper,
  StSNSWrapper,
} from './style';

const Executives = () => {
  const 총임원진 = [...임원진_LIST, ...PART_LIST];
  const initialExecutives = 총임원진.reduce(
    (acc, exec) => {
      acc[exec] = {
        name: '',
        affiliation: '',
        introduction: '',
        profileImage: '',
        email: '',
        linkedin: '',
        github: '',
        behance: '',
      };
      return acc;
    },
    {} as Record<string, Record<string, string>>,
  );
  const [executivesInfo, setExecutivesInfo] = useState(initialExecutives);
  const [selectedExec, setSelectedExec] = useState('회장');
  const method = useFormContext();

  const handleSetSelectedExec = (value: string) => {
    setSelectedExec(value);
  };

  const handleChangeInput = (label: string, value: string) => {
    setExecutivesInfo((prev) => ({
      ...prev,
      [selectedExec]: {
        ...prev[selectedExec],
        [label]: value,
      },
    }));
  };

  return (
    <StWrapper>
      <StTitle>임원진</StTitle>
      <StChipWrapper>
        <StChipLine>
          <StChipLabel>임원진</StChipLabel>
          {임원진_LIST.map((role) => (
            <Chip
              key={role}
              onClick={() => handleSetSelectedExec(role)}
              active={selectedExec === role}>
              {role}
            </Chip>
          ))}
        </StChipLine>
        <StChipLine>
          <StChipLabel>파트장</StChipLabel>
          {PART_LIST.map((part) => (
            <Chip
              key={part}
              onClick={() => handleSetSelectedExec(part)}
              active={selectedExec === part}>{`${part} 파트장`}</Chip>
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
      <StInput
        labelText="이름"
        placeholder="ex. 김솝트"
        value={executivesInfo[selectedExec].name}
        onChange={(e) => handleChangeInput('name', e.currentTarget.value)}
      />
      <StInput
        labelText="소속"
        placeholder="ex. 솝트대학교 / 솝트컴퍼니 / 앱잼 프로덕트명"
        value={executivesInfo[selectedExec].affiliation}
        onChange={(e) =>
          handleChangeInput('affiliation', e.currentTarget.value)
        }
      />
      <StInput
        labelText="한 줄 소개"
        placeholder="ex. 새로운 도전을 위해 과감히 용기내는 사람"
        value={executivesInfo[selectedExec].introduction}
        onChange={(e) =>
          handleChangeInput('introduction', e.currentTarget.value)
        }
      />
      <StSNSWrapper>
        <span>SNS</span>
        <SNSInput
          label="email"
          icon={IcMailLogo}
          placeholder="ex. 000@sopt.org"
          value={executivesInfo[selectedExec].email}
          onChange={(e) => handleChangeInput('email', e.currentTarget.value)}
        />
        <SNSInput
          label="linkedin"
          icon={IcLinkedinLogo}
          placeholder="ex. https://www.linkedin.com/..."
          value={executivesInfo[selectedExec].linkedin}
          onChange={(e) => handleChangeInput('linkedin', e.currentTarget.value)}
        />
        <SNSInput
          label="github"
          icon={IcGithubLogo}
          placeholder="ex. https://github.com/..."
          value={executivesInfo[selectedExec].github}
          onChange={(e) => handleChangeInput('github', e.currentTarget.value)}
        />
        <SNSInput
          label="behance"
          icon={IcBehanceLogo}
          placeholder="ex. https://www.behance.net/..."
          value={executivesInfo[selectedExec].behance}
          onChange={(e) => handleChangeInput('behance', e.currentTarget.value)}
        />
      </StSNSWrapper>
    </StWrapper>
  );
};

export default Executives;
