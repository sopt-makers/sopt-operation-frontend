import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { StListHeader } from '@/components/attendanceAdmin/session/SessionList/style';
import FilterButton from '@/components/common/FilterButton';
import { usePageLeaveBlocker } from '@/components/org/OrgAdmin/_hooks/usePageLeaveBlocker';
import { EXEC_TYPE, ORG_ADMIN_LIST } from '@/utils/org';

import AboutSection from './AboutSection';
import { ActionModal } from './common/ActionModal';
import CommonSection from './CommonSection';
import HomeSection from './HomeSection/HomeSection';
import RecruitSection from './RecruitSection';
import type { Group } from './types';

function OrgAdmin() {
  const [selectedPart, setSelectedPart] = useState<ORG_ADMIN>('공통');
  const [group, setGroup] = useState<Group>('OB');
  const [selectedExec, setSelectedExec] = useState<EXEC_TYPE>('회장');
  const [isEditing, setIsEditing] = useState(false);

  const {
    isPageLeaveModalOpen,
    onCancelPageLeave,
    onLeavePage,
    requestPageLeave,
  } = usePageLeaveBlocker(isEditing);

  const methods = useForm({ mode: 'onBlur' });

  const onChangePart = (part: ORG_ADMIN): void => {
    if (part === selectedPart) {
      return;
    }

    requestPageLeave(() => setSelectedPart(part));
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
        <form noValidate>
          {selectedPart === '공통' ? (
            <CommonSection
              group={group}
              onEditModeChange={setIsEditing}
              onChangeGroup={(group: Group) => {
                setGroup(group);
              }}
            />
          ) : selectedPart === '홈' ? (
            <HomeSection onEditModeChange={setIsEditing} />
          ) : selectedPart === '소개' ? (
            <AboutSection
              selectedExec={selectedExec}
              onEditModeChange={setIsEditing}
              onChangeSelectedExec={(member: EXEC_TYPE) =>
                setSelectedExec(member)
              }
            />
          ) : (
            <RecruitSection onEditModeChange={setIsEditing} />
          )}
        </form>
      </FormProvider>

      <ActionModal
        title="페이지를 나가시겠습니까?"
        description="배포되지 않은 변경사항은 사라집니다."
        isOpen={isPageLeaveModalOpen}
        variant="danger"
        leftButtonText="취소"
        rightButtonText="나가기"
        onCancel={onCancelPageLeave}
        onAction={onLeavePage}
      />
    </>
  );
}

export default OrgAdmin;
