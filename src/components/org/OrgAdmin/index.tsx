import { useState } from 'react';
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';

import type { AddAdminRequestDto } from '@/__generated__/org-types/data-contracts';
import { StListHeader } from '@/components/attendanceAdmin/session/SessionList/style';
import FilterButton from '@/components/common/FilterButton';
import {
  ORG_ADMIN_LIST,
  PART_KO,
  PART_LIST,
  SCHEDULE_FIELDS,
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

function OrgAdmin() {
  const [selectedPart, setSelectedPart] = useState<ORG_ADMIN>('공통');
  const [group, setGroup] = useState<Group>('OB');
  const [curriculumPart, setCurriculumPart] = useState<PART_KO>('기획');
  const [fnaPart, setFnaPart] = useState<PART_KO>('기획');

  const methods = useForm({ mode: 'onBlur' });
  const { handleSubmit, getValues } = methods;

  const { sendMutate, sendIsLoading } = useMutateSendData({
    headerImageFile: getValues('headerImageFileName')?.file,
    coreValueImageFile1: getValues('coreValue1')?.imageFileName.file,
    coreValueImageFile2: getValues('coreValue2')?.imageFileName.file,
    coreValueImageFile3: getValues('coreValue3')?.imageFileName.file,
    memberImageFile1: getValues('member')?.회장.profileImageFileName.file,
    memberImageFile2: getValues('member')?.부회장.profileImageFileName.file,
    memberImageFile3: getValues('member')?.총무.profileImageFileName.file,
    memberImageFile4:
      getValues('member')?.['운영 팀장']?.profileImageFileName.file,
    memberImageFile5:
      getValues('member')?.['미디어 팀장'].profileImageFileName.file,
    memberImageFile6:
      getValues('member')?.['메이커스 팀장'].profileImageFileName.file,
    memberImageFile7: getValues('member')?.기획.profileImageFileName.file,
    memberImageFile8: getValues('member')?.디자인.profileImageFileName.file,
    memberImageFile9: getValues('member')?.안드로이드.profileImageFileName.file,
    memberImageFile10: getValues('member')?.iOS.profileImageFileName.file,
    memberImageFile11: getValues('member')?.웹.profileImageFileName.file,
    memberImageFile12: getValues('member')?.서버.profileImageFileName.file,
    recruitHeaderImageFile: getValues('recruitHeaderImage')?.file,
  });

  const onChangePart = (part: ORG_ADMIN): void => {
    setSelectedPart(part);
  };

  const validateSchedule = () => {
    const validateGroup = (groupKey: Group) => {
      const groupFields = SCHEDULE_FIELDS[groupKey];
      return Object.values(groupFields)
        .flat()
        .map((field) => getValues(field.id))
        .every((value) => !!value);
    };

    const isOBValid = validateGroup('OB');
    if (!isOBValid) {
      setSelectedPart('공통');
      setGroup('OB');
      return false;
    }

    const isYBValid = validateGroup('YB');
    if (!isYBValid) {
      setSelectedPart('공통');
      setGroup('YB');
      return false;
    }

    return true;
  };

  const validateCurriculum = () => {
    for (const part of PART_LIST) {
      const content = getValues(`recruitPartCurriculum_${part}_content`);
      const preference = getValues(`recruitPartCurriculum_${part}_preference`);
      if (!content || !preference) {
        setCurriculumPart(part);
        setSelectedPart('지원하기');
        return false;
      }
    }
    return true;
  };

  const validateFna = () => {
    for (const part of PART_LIST) {
      const questionsAndAnswers = Array.from({ length: 3 }, (_, index) => ({
        question: getValues(
          `recruitQuestion_${part}_questions_${index}_question`,
        ),
        answer: getValues(`recruitQuestion_${part}_questions_${index}_answer`),
      }));

      const isPartValid = questionsAndAnswers.every(
        ({ question, answer }) => !!question && !!answer,
      );

      if (!isPartValid) {
        setFnaPart(part);
        setSelectedPart('지원하기');
        return false;
      }
    }
    return true;
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const isScheduleValid = validateSchedule();
    const isCurriculumValid = validateCurriculum();
    const isFnaValid = validateFna();

    if (isScheduleValid && isCurriculumValid && isFnaValid) {
      const {
        brandingColor,
        generation,
        name,
        recruitHeaderImage: { fileName: recruitHeaderImageFileName },
        recruitPartCurriculum,
        recruitQuestion,
        recruitSchedule,
        headerImageFileName,
        coreValue1,
        coreValue2,
        coreValue3,
        partCurriculum,
        member,
      } = data;

      const 임원진 = [...임원진_LIST, ...PART_LIST];
      const sendingData: AddAdminRequestDto = {
        generation,
        name,
        recruitSchedule: [
          {
            type: 'OB',
            schedule: {
              applicationStartTime: recruitSchedule.OB.applicationStartTime,
              applicationEndTime: recruitSchedule.OB.applicationEndTime,
              applicationResultTime: recruitSchedule.OB.applicationResultTime,
              interviewStartTime: recruitSchedule.OB.interviewStartTime,
              interviewEndTime: recruitSchedule.OB.interviewEndTime,
              finalResultTime: recruitSchedule.OB.finalResultTime,
            },
          },
          {
            type: 'YB',
            schedule: {
              applicationStartTime: recruitSchedule.YB.applicationStartTime,
              applicationEndTime: recruitSchedule.YB.applicationEndTime,
              applicationResultTime: recruitSchedule.YB.applicationResultTime,
              interviewStartTime: recruitSchedule.YB.interviewStartTime,
              interviewEndTime: recruitSchedule.YB.interviewEndTime,
              finalResultTime: recruitSchedule.YB.finalResultTime,
            },
          },
        ],
        brandingColor: {
          main: brandingColor.main,
          low: brandingColor.low,
          high: brandingColor.high,
          point: brandingColor.point,
        },
        mainButton: {
          text: '지원하기',
          keyColor: '#FF0000',
          subColor: '#CC0000',
        },
        partIntroduction: [
          {
            part: '기획',
            description: '기획 앱 개발',
          },
          {
            part: '디자인',
            description: '디자인 앱 개발',
          },
          {
            part: '안드로이드',
            description: '안드로이드 앱 개발',
          },
          {
            part: 'iOS',
            description: 'iOS 앱 개발',
          },
          {
            part: '웹',
            description: '웹 앱 개발',
          },
          {
            part: '서버',
            description: '서버 앱 개발',
          },
        ],
        headerImageFileName: headerImageFileName?.fileName,
        coreValue: [
          { ...coreValue1, imageFileName: coreValue1.imageFileName?.fileName },
          { ...coreValue2, imageFileName: coreValue2.imageFileName?.fileName },
          { ...coreValue3, imageFileName: coreValue3.imageFileName?.fileName },
        ],
        partCurriculum: PART_LIST.map((v) => {
          return {
            part: v,
            curriculums: partCurriculum[v],
          };
        }),
        member: 임원진.map((v) => {
          return {
            ...member[v],
            role: v,
            profileImageFileName: member[v]?.profileImageFileName?.fileName,
          };
        }),
        recruitHeaderImageFileName,
        recruitPartCurriculum: PART_LIST.map((v) => ({
          part: v,
          introduction: {
            content: recruitPartCurriculum.v.content,
            preference: recruitPartCurriculum.v.preference,
          },
        })),
        recruitQuestion: PART_LIST.map((v) => ({
          part: v,
          questions: [0, 1, 2].map((n) => ({
            question: `${recruitQuestion}.${v}.question${n}}`,
            answer: `${recruitQuestion}.${v}.answer${n}}`,
          })),
        })),
      };

      sendMutate(sendingData);
    }
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
          ) : selectedPart === '소개' ? (
            <AboutSection />
          ) : selectedPart === '홈' ? (
            <HomeSection />
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
