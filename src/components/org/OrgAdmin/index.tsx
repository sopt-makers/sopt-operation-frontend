import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { StListHeader } from '@/components/attendanceAdmin/session/SessionList/style';
import FilterButton from '@/components/common/FilterButton';
import {
  ORG_ADMIN_LIST,
  PART_KO,
  PART_LIST,
  SCHEDULE_FIELDS,
} from '@/utils/org';

import AboutSection from './AboutSection';
import SubmitIcon from './assets/SubmitIcon';
import CommonSection from './CommonSection';
import HomeSection from './home/HomeSection';
import RecruitSection from './RecruitSection';
import { StSubmitButton, StSubmitText } from './style';
import { Group } from './types';

function OrgAdmin() {
  const [selectedPart, setSelectedPart] = useState<ORG_ADMIN>('공통');
  const [group, setGroup] = useState<Group>('OB');
  const [curriculumPart, setCurriculumPart] = useState<PART_KO>('기획');
  const [fnaPart, setFnaPart] = useState<PART_KO>('기획');

  const methods = useForm({ mode: 'onBlur' });
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
      console.log(data);
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
            <StSubmitText>배포</StSubmitText>
          </StSubmitButton>
        </form>
      </FormProvider>
    </>
  );
}

export default OrgAdmin;
