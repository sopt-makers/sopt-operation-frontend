import { Button, useToast } from '@sopt-makers/ui';
import { useState } from 'react';
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';

import { AddAdminRequestDto } from '@/__generated__/org-types/data-contracts';
import {
  StDevHStack,
  StListHeader,
} from '@/components/attendanceAdmin/session/SessionList/style';
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
import { ActionModal } from './common/ActionModal';
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
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<ORG_ADMIN>('공통');

  const [group, setGroup] = useState<Group>('OB');

  const [selectedPartInHomeTap, setSelectedPartInHomeTap] =
    useState<PART_KO>('기획');
  const [selectedExec, setSelectedExec] = useState<EXEC_TYPE>('회장');

  const [curriculumPart, setCurriculumPart] = useState<PART_KO>('기획');
  const [fnaPart, setFnaPart] = useState<PART_KO>('기획');
  const [introPart, setIntroPart] = useState<PART_KO>('기획');

  const methods = useForm({ mode: 'onBlur' });
  const { handleSubmit, getValues, setError, reset, setValue } = methods;

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

  const handleCheckNonFilledInputs = () => {
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
        return false;
      }
    }

    return true;
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
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
      member: [...임원진_LIST, ...PART_LIST]
        .filter((exec) => member && member[exec] && member[exec].profileImageFileName)
        .map((exec) => ({
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

  const handleClickMagicButton = (type: 'SET' | 'GET' | 'IMAGE' | 'RESET') => {
    if (type === 'SET') {
      localStorage.setItem('org-admin', JSON.stringify(getValues()));
      alert('데이터 임시저장 성공!');
      return;
    }
    if (type === 'GET') {
      const data = localStorage.getItem('org-admin');
      if (!data) {
        alert('저장된 데이터가 없음ㅠ');
      } else {
        reset(JSON.parse(data));
        alert(
          '데이터 불러오기 성공! \n소개탭 헤더를 반드시 다시 첨부해주세요!',
        );
      }
      return;
    }

    if (type === 'IMAGE') {
      const headerImage = getValues('headerImageFileName');
      if (!(headerImage?.file instanceof File)) {
        alert('소개탭 헤더 넣어주세용');
        return;
      }
      setValue('coreValue1.imageFileName', headerImage);
      setValue('coreValue2.imageFileName', headerImage);
      setValue('coreValue3.imageFileName', headerImage);
      setValue('member.회장.profileImageFileName', headerImage);
      setValue('member.부회장.profileImageFileName', headerImage);
      setValue('member.총무.profileImageFileName', headerImage);
      setValue('member.운영 팀장.profileImageFileName', headerImage);
      setValue('member.미디어 팀장.profileImageFileName', headerImage);
      setValue('member.메이커스 팀장.profileImageFileName', headerImage);
      setValue('member.기획.profileImageFileName', headerImage);
      setValue('member.디자인.profileImageFileName', headerImage);
      setValue('member.안드로이드.profileImageFileName', headerImage);
      setValue('member.iOS.profileImageFileName', headerImage);
      setValue('member.웹.profileImageFileName', headerImage);
      setValue('member.서버.profileImageFileName', headerImage);
      setValue('recruitHeaderImage', headerImage);

      alert('소개탭 헤더로 이미지 밀기 성공!');
      return;
    }
    localStorage.removeItem('org-admin');

    alert('데이터 초기화 성공! 새로고침하세용');
  };
  return (
    <>
      {process.env.NEXT_PUBLIC_API_URL !== 'PRODUCTION' && (
        <StDevHStack>
          <p>매직버튼</p>
          <Button size="sm" onClick={() => handleClickMagicButton('SET')}>
            임시저장
          </Button>
          <Button size="sm" onClick={() => handleClickMagicButton('GET')}>
            불러오기
          </Button>
          <Button size="sm" onClick={() => handleClickMagicButton('IMAGE')}>
            이미지 채우기
          </Button>
          <Button size="sm" onClick={() => handleClickMagicButton('RESET')}>
            데이터삭제
          </Button>
        </StDevHStack>
      )}

      <StListHeader>
        <h1>공홈 관리</h1>
        <FilterButton
          list={ORG_ADMIN_LIST}
          selected={selectedPart}
          onChange={onChangePart}
        />
      </StListHeader>
      <FormProvider {...methods}>
        <form noValidate>
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
          <StSubmitButton
            type="button"
            onClick={() => {
              if (handleCheckNonFilledInputs()) {
                setIsActionModalOpen(true);
              }
            }}>
            <SubmitIcon />
            <StSubmitText>{sendIsLoading ? '배포 중...' : '배포'}</StSubmitText>
          </StSubmitButton>
        </form>
      </FormProvider>
      <ActionModal
        isOpen={isActionModalOpen}
        onCancel={() => {
          setIsActionModalOpen(false);
        }}
        onAction={() => {
          setIsActionModalOpen(false);
          handleSubmit(onSubmit)();
        }}
        variant="deploy"
        alertText="배포하시겠습니까?"
        description={
          '입력한 내용은 공홈에 즉시 반영돼요.\n잘못 기입된 부분이 없는지 마지막으로 확인해주세요.'
        }
      />
    </>
  );
}

export default OrgAdmin;
