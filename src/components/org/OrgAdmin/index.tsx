import { useToast } from '@sopt-makers/ui';
import { useState } from 'react';
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';

import { StListHeader } from '@/components/attendanceAdmin/session/SessionList/style';
import FilterButton from '@/components/common/FilterButton';
import { type EXEC_TYPE, ORG_ADMIN_LIST, type PART_KO } from '@/utils/org';

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
        handleValidationAboutInputs,
        handleValidationRecruitInputs,
      ],
      홈: [],
      소개: [
        handleValidationAboutInputs,
        handleValidateCommonInputs,
        handleValidationRecruitInputs,
      ],
      지원하기: [
        handleValidationRecruitInputs,
        handleValidateCommonInputs,
        handleValidationAboutInputs,
      ],
    };

    const validationSequence = validationFlow[selectedPart];

    const getPartForValidation = (validateFn: () => boolean) => {
      if (validateFn === handleValidateCommonInputs) return '공통';
      if (validateFn === handleValidationAboutInputs) return '소개';
      if (validateFn === handleValidationRecruitInputs) return '지원하기';
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

    const validatePartIntro = () => {
      for (const part of PARTS) {
        if (getValues(`partIntroduction${part}`) === '') {
          setIntroPart(part);
          setSelectedPart('홈');
          return false;
        }
      }

      return true;
    };
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
