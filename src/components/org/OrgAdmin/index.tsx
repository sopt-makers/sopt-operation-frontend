import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { StListHeader } from '@/components/attendanceAdmin/session/SessionList/style';
import FilterButton from '@/components/common/FilterButton';
import { getToken } from '@/utils/auth';
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
import HomeSection from './home/HomeSection';
import useMutateSendData from './hooks';
import RecruitSection from './RecruitSection';
import { StSubmitButton, StSubmitText } from './style';
import { Group } from './types';

function OrgAdmin() {
  const [selectedPart, setSelectedPart] = useState<ORG_ADMIN>('공통');
  const [group, setGroup] = useState<Group>('OB');
  const [curriculumPart, setCurriculumPart] = useState<PART_KO>('기획');
  const [fnaPart, setFnaPart] = useState<PART_KO>('기획');

  const { sendMutate, sendIsLoading } = useMutateSendData();

  const methods = useForm<Record<string, any>>({ mode: 'onBlur' });
  const { handleSubmit, getValues } = methods;

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

  const onSubmit = (data: any) => {
    const isScheduleValid = validateSchedule();
    const isCurriculumValid = validateCurriculum();
    const isFnaValid = validateFna();

    if (isScheduleValid && isCurriculumValid && isFnaValid) {
      const {
        brandingColor_high,
        brandingColor_low,
        brandingColor_main,
        brandingColor_point,
        generation,
        name,
        recruitHeaderImage: { fileName: recruitHeaderImageFileName },
        recruitPartCurriculum_iOS_content,
        recruitPartCurriculum_iOS_preference,
        recruitPartCurriculum_기획_content,
        recruitPartCurriculum_기획_preference,
        recruitPartCurriculum_디자인_content,
        recruitPartCurriculum_디자인_preference,
        recruitPartCurriculum_서버_content,
        recruitPartCurriculum_서버_preference,
        recruitPartCurriculum_안드로이드_content,
        recruitPartCurriculum_안드로이드_preference,
        recruitPartCurriculum_웹_content,
        recruitPartCurriculum_웹_preference,
        recruitQuestion_iOS_questions_0_answer,
        recruitQuestion_iOS_questions_0_question,
        recruitQuestion_iOS_questions_1_answer,
        recruitQuestion_iOS_questions_1_question,
        recruitQuestion_iOS_questions_2_answer,
        recruitQuestion_iOS_questions_2_question,
        recruitQuestion_기획_questions_0_answer,
        recruitQuestion_기획_questions_0_question,
        recruitQuestion_기획_questions_1_answer,
        recruitQuestion_기획_questions_1_question,
        recruitQuestion_기획_questions_2_answer,
        recruitQuestion_기획_questions_2_question,
        recruitQuestion_디자인_questions_0_answer,
        recruitQuestion_디자인_questions_0_question,
        recruitQuestion_디자인_questions_1_answer,
        recruitQuestion_디자인_questions_1_question,
        recruitQuestion_디자인_questions_2_answer,
        recruitQuestion_디자인_questions_2_question,
        recruitQuestion_서버_questions_0_answer,
        recruitQuestion_서버_questions_0_question,
        recruitQuestion_서버_questions_1_answer,
        recruitQuestion_서버_questions_1_question,
        recruitQuestion_서버_questions_2_answer,
        recruitQuestion_서버_questions_2_question,
        recruitQuestion_안드로이드_questions_0_answer,
        recruitQuestion_안드로이드_questions_0_question,
        recruitQuestion_안드로이드_questions_1_answer,
        recruitQuestion_안드로이드_questions_1_question,
        recruitQuestion_안드로이드_questions_2_answer,
        recruitQuestion_안드로이드_questions_2_question,
        recruitQuestion_웹_questions_0_answer,
        recruitQuestion_웹_questions_0_question,
        recruitQuestion_웹_questions_1_answer,
        recruitQuestion_웹_questions_1_question,
        recruitQuestion_웹_questions_2_answer,
        recruitQuestion_웹_questions_2_question,
        recruitSchedule_OB_schedule_applicationEndTime,
        recruitSchedule_OB_schedule_applicationResultTime,
        recruitSchedule_OB_schedule_applicationStartTime,
        recruitSchedule_OB_schedule_finalResultTime,
        recruitSchedule_OB_schedule_interviewEndTime,
        recruitSchedule_OB_schedule_interviewStartTime,
        recruitSchedule_YB_schedule_applicationEndTime,
        recruitSchedule_YB_schedule_applicationResultTime,
        recruitSchedule_YB_schedule_applicationStartTime,
        recruitSchedule_YB_schedule_finalResultTime,
        recruitSchedule_YB_schedule_interviewEndTime,
        recruitSchedule_YB_schedule_interviewStartTime,
        headerImageFileName,
        coreValue1,
        coreValue2,
        coreValue3,
        partCurriculum,
        member,
      } = data;

      const 임원진 = [...임원진_LIST, ...PART_LIST];
      const sendingData = {
        generation,
        name,
        recruitSchedule: [
          {
            type: 'OB',
            schedule: {
              applicationStartTime:
                recruitSchedule_OB_schedule_applicationStartTime,
              applicationEndTime:
                recruitSchedule_OB_schedule_applicationEndTime,
              applicationResultTime:
                recruitSchedule_OB_schedule_applicationResultTime,
              interviewStartTime:
                recruitSchedule_OB_schedule_interviewStartTime,
              interviewEndTime: recruitSchedule_OB_schedule_interviewEndTime,
              finalResultTime: recruitSchedule_OB_schedule_finalResultTime,
            },
          },
          {
            type: 'YB',
            schedule: {
              applicationStartTime:
                recruitSchedule_YB_schedule_applicationStartTime,
              applicationEndTime:
                recruitSchedule_YB_schedule_applicationEndTime,
              applicationResultTime:
                recruitSchedule_YB_schedule_applicationResultTime,
              interviewStartTime:
                recruitSchedule_YB_schedule_interviewStartTime,
              interviewEndTime: recruitSchedule_YB_schedule_interviewEndTime,
              finalResultTime: recruitSchedule_YB_schedule_finalResultTime,
            },
          },
        ],
        brandingColor: {
          main: brandingColor_main,
          low: brandingColor_low,
          high: brandingColor_high,
          point: brandingColor_point,
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
        recruitPartCurriculum: [
          {
            part: '기획',
            introduction: {
              content: recruitPartCurriculum_기획_content,
              preference: recruitPartCurriculum_기획_preference,
            },
          },
          {
            part: '디자인',
            introduction: {
              content: recruitPartCurriculum_디자인_content,
              preference: recruitPartCurriculum_디자인_preference,
            },
          },
          {
            part: '안드로이드',
            introduction: {
              content: recruitPartCurriculum_안드로이드_content,
              preference: recruitPartCurriculum_안드로이드_preference,
            },
          },
          {
            part: 'iOS',
            introduction: {
              content: recruitPartCurriculum_iOS_content,
              preference: recruitPartCurriculum_iOS_preference,
            },
          },
          {
            part: '웹',
            introduction: {
              content: recruitPartCurriculum_웹_content,
              preference: recruitPartCurriculum_웹_preference,
            },
          },
          {
            part: '서버',
            introduction: {
              content: recruitPartCurriculum_서버_content,
              preference: recruitPartCurriculum_서버_preference,
            },
          },
        ],
        recruitQuestion: [
          {
            part: '기획',
            questions: [
              {
                question: recruitQuestion_기획_questions_0_question,
                answer: recruitQuestion_기획_questions_0_answer,
              },
              {
                question: recruitQuestion_기획_questions_1_question,
                answer: recruitQuestion_기획_questions_1_answer,
              },
              {
                question: recruitQuestion_기획_questions_2_question,
                answer: recruitQuestion_기획_questions_2_answer,
              },
            ],
          },
          {
            part: '디자인',
            questions: [
              {
                question: recruitQuestion_디자인_questions_0_question,
                answer: recruitQuestion_디자인_questions_0_answer,
              },
              {
                question: recruitQuestion_디자인_questions_1_question,
                answer: recruitQuestion_디자인_questions_1_answer,
              },
              {
                question: recruitQuestion_디자인_questions_2_question,
                answer: recruitQuestion_디자인_questions_2_answer,
              },
            ],
          },
          {
            part: '안드로이드',
            questions: [
              {
                question: recruitQuestion_안드로이드_questions_0_question,
                answer: recruitQuestion_안드로이드_questions_0_answer,
              },
              {
                question: recruitQuestion_안드로이드_questions_1_question,
                answer: recruitQuestion_안드로이드_questions_1_answer,
              },
              {
                question: recruitQuestion_안드로이드_questions_2_question,
                answer: recruitQuestion_안드로이드_questions_2_answer,
              },
            ],
          },
          {
            part: 'iOS',
            questions: [
              {
                question: recruitQuestion_iOS_questions_0_question,
                answer: recruitQuestion_iOS_questions_0_answer,
              },
              {
                question: recruitQuestion_iOS_questions_1_question,
                answer: recruitQuestion_iOS_questions_1_answer,
              },
              {
                question: recruitQuestion_iOS_questions_2_question,
                answer: recruitQuestion_iOS_questions_2_answer,
              },
            ],
          },
          {
            part: '웹',
            questions: [
              {
                question: recruitQuestion_웹_questions_0_question,
                answer: recruitQuestion_웹_questions_0_answer,
              },
              {
                question: recruitQuestion_웹_questions_1_question,
                answer: recruitQuestion_웹_questions_1_answer,
              },
              {
                question: recruitQuestion_웹_questions_2_question,
                answer: recruitQuestion_웹_questions_2_answer,
              },
            ],
          },
          {
            part: '서버',
            questions: [
              {
                question: recruitQuestion_서버_questions_0_question,
                answer: recruitQuestion_서버_questions_0_answer,
              },
              {
                question: recruitQuestion_서버_questions_1_question,
                answer: recruitQuestion_서버_questions_1_answer,
              },
              {
                question: recruitQuestion_서버_questions_2_question,
                answer: recruitQuestion_서버_questions_2_answer,
              },
            ],
          },
        ],
      };

      console.log('>>sendingData', sendingData);
      // sendMutate(sendingData);
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
