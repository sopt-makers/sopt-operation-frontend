import { ToastProvider } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ActionModal } from '@/components/org/OrgAdmin/common/ActionModal';
import {
  EDIT_STEP,
  type EditStep,
} from '@/components/org/OrgAdmin/common/constants/editStep';
import { EditActionBar } from '@/components/org/OrgAdmin/common/EditActionBar';
import { useAdminInfoQuery } from '@/components/org/OrgAdmin/HomeSection/queries';
import { validationCommonInputs } from '@/components/org/OrgAdmin/utils';

import { StContainer } from '../style';
import type { Group } from '../types';
import BrandingColor from './BrandingColor';
import { syncCommonFormFromAdminData } from './formMapper';
import GenerationInformation from './GenerationInformation';
import { useDeployCommonMutation } from './queries';
import RecruitSchedule from './RecruitSchedule';

interface CommonSectionProps {
  group: Group;
  onChangeGroup: (group: Group) => void;
}

const COMMON_FIELD_NAMES = [
  'generation',
  'name',
  'recruitSchedule',
  'brandingColor',
];

const CommonSectionContent = ({ group, onChangeGroup }: CommonSectionProps) => {
  const [editStep, setEditStep] = useState<EditStep>(EDIT_STEP.VIEW);
  const [snapshot, setSnapshot] = useState<unknown[] | null>(null);

  const { data } = useAdminInfoQuery();
  const { mutate: deployCommon, isLoading: isDeploying } =
    useDeployCommonMutation();

  const { control, getValues, setValue, setError, clearErrors } =
    useFormContext();

  const watchedValues = useWatch({ control, name: COMMON_FIELD_NAMES });

  const isEditMode = editStep !== EDIT_STEP.VIEW;
  const isDeployModalOpen = editStep === EDIT_STEP.DEPLOY;
  const hasUnsavedChanges =
    isEditMode &&
    snapshot !== null &&
    JSON.stringify(watchedValues) !== JSON.stringify(snapshot);

  useEffect(() => {
    syncCommonFormFromAdminData(data, setValue);
  }, [data, setValue]);

  const startEditMode = () => {
    // getValues()는 recruitSchedule/brandingColor 같은 중첩 객체에 대해
    // RHF 내부 상태의 참조를 그대로 돌려준다. 깊은 복사 없이 들고 있으면
    // 이후 setValue로 인해 snapshot도 같이 바뀌어버려 비교/복원이 무력화된다.
    setSnapshot(JSON.parse(JSON.stringify(getValues(COMMON_FIELD_NAMES))));
    setEditStep(EDIT_STEP.EDITING);
  };

  const cancelEditMode = () => {
    if (snapshot) {
      COMMON_FIELD_NAMES.forEach((name, index) => {
        setValue(name, snapshot[index], {
          shouldDirty: false,
          shouldValidate: false,
        });
      });
      clearErrors(COMMON_FIELD_NAMES);
    }
    setSnapshot(null);
    setEditStep(EDIT_STEP.VIEW);
  };

  const handleDeploy = () => {
    deployCommon(getValues(), {
      onSuccess: () => {
        setSnapshot(null);
        setEditStep(EDIT_STEP.VIEW);
      },
    });
  };

  return (
    <StContainer>
      <EditActionBar
        isEditMode={isEditMode}
        isDeploying={isDeploying}
        hasUnsavedChanges={hasUnsavedChanges}
        onStartEdit={startEditMode}
        onCancel={cancelEditMode}
        onDeploy={() => {
          if (validationCommonInputs(getValues, setError, onChangeGroup)) {
            setEditStep(EDIT_STEP.DEPLOY);
          }
        }}
      />
      <GenerationInformation isEditable={isEditMode} />
      <RecruitSchedule
        group={group}
        onChangeGroup={onChangeGroup}
        isEditable={isEditMode}
      />
      <BrandingColor isEditable={isEditMode} />

      <ActionModal
        variant="deploy"
        isOpen={isDeployModalOpen}
        onCancel={() => setEditStep(EDIT_STEP.EDITING)}
        onAction={handleDeploy}
        alertText="배포하시겠습니까?"
        description="입력한 공통 설정 내용은 공홈에 즉시 반영돼요."
      />
    </StContainer>
  );
};

const CommonSection = (props: CommonSectionProps) => {
  return (
    <ToastProvider>
      <CommonSectionContent {...props} />
    </ToastProvider>
  );
};

export default CommonSection;
