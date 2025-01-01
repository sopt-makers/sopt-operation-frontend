import { useToast } from '@sopt-makers/ui';
import { useState } from 'react';
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';

import { AddAdminRequestDto } from '@/__generated__/org-types/data-contracts';
import { StListHeader } from '@/components/attendanceAdmin/session/SessionList/style';
import FilterButton from '@/components/common/FilterButton';
import {
  type EXEC_TYPE,
  ORG_ADMIN_LIST,
  type PART_KO,
  PART_LIST,
  임원진_LIST,
} from '@/utils/org';

import AboutSection from './AboutSection';
import SubmitIcon from './assets/SubmitIcon';
import CommonSection from './CommonSection';
import HomeSection from './HomeSection/HomeSection';
import useMutateSendData from './hooks';
import RecruitSection from './RecruitSection';
import { StSubmitButton, StSubmitText } from './style';
import type { Group } from './types';
import {
  validationAboutInputs,
  validationCommonInputs,
  validationHomeInputs,
  validationRecruitInputs,
} from './utils';

function OrgAdmin() {
  const [selectedPart, setSelectedPart] = useState<ORG_ADMIN>('공통');
  const [group, setGroup] = useState<Group>('OB');

  const [selectedPartInHomeTap, setSelectedPartInHomeTap] =
    useState<PART_KO>('기획');
  const [selectedExec, setSelectedExec] = useState<EXEC_TYPE>('회장');

  const [curriculumPart, setCurriculumPart] = useState<PART_KO>('기획');
  const [fnaPart, setFnaPart] = useState<PART_KO>('기획');
  const [introPart, setIntroPart] = useState<PART_KO>('기획');

  const methods = useForm({ mode: 'onBlur' });
  const { handleSubmit, getValues, setError } = methods;

  const { open } = useToast();

  const { sendMutate, sendIsLoading } = useMutateSendData({
    headerImageFile: getValues('headerImageFileName')?.file,
    coreValueImageFile1: getValues('coreValue1')?.imageFileName?.file,
    coreValueImageFile2: getValues('coreValue2')?.imageFileName?.file,
    coreValueImageFile3: getValues('coreValue3')?.imageFileName?.file,
    memberImageFile1: getValues('member')?.회장?.profileImageFileName?.file,
    memberImageFile2: getValues('member')?.부회장?.profileImageFileName?.file,
    memberImageFile3: getValues('member')?.총무?.profileImageFileName?.file,
    memberImageFile4:
      getValues('member')?.['운영 팀장']?.profileImageFileName?.file,
    memberImageFile5:
      getValues('member')?.['미디어 팀장']?.profileImageFileName?.file,
    memberImageFile6:
      getValues('member')?.['메이커스 팀장']?.profileImageFileName?.file,
    memberImageFile7: getValues('member')?.기획?.profileImageFileName?.file,
    memberImageFile8: getValues('member')?.디자인?.profileImageFileName?.file,
    memberImageFile9:
      getValues('member')?.안드로이드?.profileImageFileName?.file,
    memberImageFile10: getValues('member')?.iOS?.profileImageFileName?.file,
    memberImageFile11: getValues('member')?.웹?.profileImageFileName?.file,
    memberImageFile12: getValues('member')?.서버?.profileImageFileName?.file,
    recruitHeaderImageFile: getValues('recruitHeaderImage')?.file,
  });

  const onChangePart = (part: ORG_ADMIN): void => {
    setSelectedPart(part);
  };

  const onChangeIntroPart = (part: PART_KO) => {
    setIntroPart(part);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const handleValidateCommonInputs = () =>
      validationCommonInputs(getValues, setError, setGroup);
    const handleValidateHomeInputs = () =>
      validationHomeInputs(getValues, setError, onChangeIntroPart);
    const handleValidationAboutInputs = () =>
      validationAboutInputs(
        getValues,
        setError,
        setSelectedPartInHomeTap,
        setSelectedExec,
      );
    const handleValidationRecruitInputs = () =>
      validationRecruitInputs(
        getValues,
        setError,
        setCurriculumPart,
        setFnaPart,
      );

    const validationFlow = {
      공통: [
        handleValidateCommonInputs,
        handleValidateHomeInputs,
        handleValidationAboutInputs,
        handleValidationRecruitInputs,
      ],
      홈: [
        handleValidateHomeInputs,
        handleValidateCommonInputs,
        handleValidationAboutInputs,
        handleValidationRecruitInputs,
      ],
      소개: [
        handleValidationAboutInputs,
        handleValidateCommonInputs,
        handleValidateHomeInputs,
        handleValidationRecruitInputs,
      ],
      지원하기: [
        handleValidationRecruitInputs,
        handleValidateCommonInputs,
        handleValidateHomeInputs,
        handleValidationAboutInputs,
      ],
    };

    const validationSequence = validationFlow[selectedPart];

    const getPartForValidation = (validateFn: () => boolean) => {
      if (validateFn === handleValidateCommonInputs) return '공통';
      if (validateFn === handleValidationAboutInputs) return '소개';
      if (validateFn === handleValidationRecruitInputs) return '지원하기';
      if (validateFn === handleValidateHomeInputs) return '홈';
      return '공통';
    };

    for (const validate of validationSequence) {
      const isValid = validate();

      if (!isValid) {
        open({
          icon: 'error',
          content: `${getPartForValidation(validate)}탭에 아직 채우지 않은 필드가 있어요.`,
        });
        setSelectedPart(getPartForValidation(validate));
        return;
      }
    }
    const {
      generation,
      brandingColor,
      coreValue1,
      coreValue2,
      coreValue3,
      headerImageFileName,
      member,
      name,
      partCurriculum,
      partIntroductioniOS,
      partIntroduction기획,
      partIntroduction디자인,
      partIntroduction서버,
      partIntroduction안드로이드,
      partIntroduction웹,
      recruitHeaderImage,
      recruitPartCurriculum,
      recruitQuestion,
      recruitSchedule,
    } = data;
    const requestBody: AddAdminRequestDto = {
      generation: Number(generation),
      name,
      recruitSchedule: [
        {
          type: 'OB',
          schedule: recruitSchedule.OB,
        },
        {
          type: 'YB',
          schedule: recruitSchedule.YB,
        },
      ],
      brandingColor,
      mainButton: {
        text: '지원하기',
        keyColor: '#FF0000',
        subColor: '#CC0000',
      },
      partIntroduction: [
        {
          part: '기획',
          description: partIntroduction기획,
        },
        {
          part: '디자인',
          description: partIntroduction디자인,
        },
        {
          part: '서버',
          description: partIntroduction서버,
        },
        {
          part: '웹',
          description: partIntroduction웹,
        },
        {
          part: '안드로이드',
          description: partIntroduction안드로이드,
        },
        {
          part: 'iOS',
          description: partIntroductioniOS,
        },
      ],
      headerImageFileName: headerImageFileName.fileName,
      coreValue: [
        {
          ...coreValue1,
          imageFileName: coreValue1.imageFileName.fileName,
        },
        {
          ...coreValue2,
          imageFileName: coreValue2.imageFileName.fileName,
        },
        {
          ...coreValue3,
          imageFileName: coreValue3.imageFileName.fileName,
        },
      ],
      partCurriculum: PART_LIST.map((part) => ({
        part,
        curriculums: partCurriculum[part],
      })),
      member: [...임원진_LIST, ...PART_LIST].map((exec) => ({
        role: exec,
        ...member[exec],
        profileImageFileName: member[exec].profileImageFileName.fileName,
      })),
      recruitHeaderImageFileName: recruitHeaderImage.fileName,
      recruitPartCurriculum: PART_LIST.map((part) => ({
        part,
        introduction: recruitPartCurriculum[part],
      })),
      recruitQuestion: PART_LIST.map((part) => ({
        part,
        questions: [
          {
            question: recruitQuestion[part].question0,
            answer: recruitQuestion[part].answer0,
          },
          {
            question: recruitQuestion[part].question1,
            answer: recruitQuestion[part].answer1,
          },
          {
            question: recruitQuestion[part].question2,
            answer: recruitQuestion[part].answer2,
          },
        ],
      })),
    };
    sendMutate(requestBody);
  };

  return (
    <>
      <StListHeader>
        <h1>공홈 관리</h1>
        <FilterButton
          list={ORG_ADMIN_LIST}
          selected={selectedPart}
          onChange={onChangePart}
        />
      </StListHeader>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {selectedPart === '공통' ? (
            <CommonSection
              group={group}
              onChangeGroup={(group: Group) => {
                setGroup(group);
              }}
            />
          ) : selectedPart === '홈' ? (
            <HomeSection
              selectedIntroPart={introPart}
              onChangeIntroPart={onChangeIntroPart}
            />
          ) : selectedPart === '소개' ? (
            <AboutSection
              selectedPart={selectedPartInHomeTap}
              onChangeSelectedPart={(part: PART_KO) =>
                setSelectedPartInHomeTap(part)
              }
              selectedExec={selectedExec}
              onChangeSelectedExec={(member: EXEC_TYPE) =>
                setSelectedExec(member)
              }
            />
          ) : (
            <RecruitSection
              curriculumPart={curriculumPart}
              onChangeCurriculumPart={(part: PART_KO) =>
                setCurriculumPart(part)
              }
              fnaPart={fnaPart}
              onChangeFnaPart={(part: PART_KO) => setFnaPart(part)}
            />
          )}
          <StSubmitButton>
            <SubmitIcon />
            <StSubmitText>{sendIsLoading ? '배포 중...' : '배포'}</StSubmitText>
          </StSubmitButton>
        </form>
      </FormProvider>
    </>
  );
}

export default OrgAdmin;
