import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { StListHeader } from '@/components/attendanceAdmin/session/SessionList/style';
import FilterButton from '@/components/common/FilterButton';
import { ORG_ADMIN_LIST } from '@/utils/org';

import AboutSection from './AboutSection';
import SubmitIcon from './assets/SubmitIcon';
import CommonSection from './CommonSection';
import HomeSection from './home/HomeSection';
import RecruitSection from './RecruitSection';
import { StSubmitButton, StSubmitText } from './style';
import { Group } from './types';

const FIELD_IDS = {
  OB: [
    'recruitSchedule_OB_schedule_applicationStartTime',
    'recruitSchedule_OB_schedule_applicationEndTime',
    'recruitSchedule_OB_schedule_applicationResultTime',
    'recruitSchedule_OB_schedule_interviewStartTime',
    'recruitSchedule_OB_schedule_interviewEndTime',
    'recruitSchedule_OB_schedule_finalResultTime',
  ],
  YB: [
    'recruitSchedule_YB_schedule_applicationStartTime',
    'recruitSchedule_YB_schedule_applicationEndTime',
    'recruitSchedule_YB_schedule_applicationResultTime',
    'recruitSchedule_YB_schedule_interviewStartTime',
    'recruitSchedule_YB_schedule_interviewEndTime',
    'recruitSchedule_YB_schedule_finalResultTime',
  ],
};

function OrgAdmin() {
  const [selectedPart, setSelectedPart] = useState<ORG_ADMIN>('공통');
  const [group, setGroup] = useState<Group>('OB');
  const methods = useForm({ mode: 'onBlur' });
  const { handleSubmit, getValues } = methods;

  const onChangePart = (part: ORG_ADMIN): void => {
    setSelectedPart(part);
  };

  const validateSchedule = () => {
    const obValues = FIELD_IDS.OB.map((field) => getValues(field));
    const ybValues = FIELD_IDS.YB.map((field) => getValues(field));

    const isOBValid = obValues.every((value) => !!value);
    const isYBValid = ybValues.every((value) => !!value);

    if (!isOBValid) {
      setGroup('OB');
      return false;
    }

    if (!isYBValid) {
      setGroup('YB');
      return false;
    }

    return true;
  };

  const onSubmit = (data: any) => {
    const isValid = validateSchedule();
    if (isValid) {
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <RecruitSection />
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
