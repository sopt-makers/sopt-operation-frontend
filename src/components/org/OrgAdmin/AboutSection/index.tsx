import { ToastProvider } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ActionModal } from '@/components/org/OrgAdmin/common/ActionModal';
import {
  EDIT_STEP,
  type EditStep,
} from '@/components/org/OrgAdmin/common/constants/editStep';
import { EditActionBar } from '@/components/org/OrgAdmin/common/EditActionBar';
import { useAdminInfoQuery } from '@/components/org/OrgAdmin/HomeSection/queries';
import { validationAboutInputs } from '@/components/org/OrgAdmin/utils';
import { EXEC_TYPE } from '@/utils/org';

import { StContainer } from '../style';
import CoreValue from './CoreValue';
import Executives from './Executives';
import { syncAboutFormFromAdminData } from './formMapper';
import HeaderBanner from './HeaderBanner';
import { useDeployAboutMutation } from './queries';
import Schedule from './Schedule';

interface AboutSectionProps {
  selectedExec: EXEC_TYPE;
  onChangeSelectedExec: (member: EXEC_TYPE) => void;
}

const AboutSectionContent = ({
  selectedExec,
  onChangeSelectedExec,
}: AboutSectionProps) => {
  const [editStep, setEditStep] = useState<EditStep>(EDIT_STEP.VIEW);

  const { data } = useAdminInfoQuery();
  const { mutate: deployAbout, isLoading: isDeploying } =
    useDeployAboutMutation();

  const {
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { isDirty },
  } = useFormContext();

  const isEditMode = editStep !== EDIT_STEP.VIEW;
  const isDeployModalOpen = editStep === EDIT_STEP.DEPLOY;
  const hasUnsavedChanges = isEditMode && isDirty;

  useEffect(() => {
    syncAboutFormFromAdminData(data, setValue);
  }, [data, setValue]);

  const exitEditMode = () => {
    syncAboutFormFromAdminData(data, setValue);
    clearErrors();
    setEditStep(EDIT_STEP.VIEW);
  };

  const handleDeploy = () => {
    deployAbout(
      { values: getValues() },
      {
        onSuccess: () => setEditStep(EDIT_STEP.VIEW),
      },
    );
  };

  return (
    <StContainer>
      <EditActionBar
        isEditMode={isEditMode}
        isDeploying={isDeploying}
        hasUnsavedChanges={hasUnsavedChanges}
        onStartEdit={() => setEditStep(EDIT_STEP.EDITING)}
        onCancel={exitEditMode}
        onDeploy={() => {
          if (
            validationAboutInputs(
              getValues,
              setError,
              data?.headerImage,
              data?.coreValue,
              data?.member,
            )
          ) {
            setEditStep(EDIT_STEP.DEPLOY);
          }
        }}
      />
      <HeaderBanner isEditable={isEditMode} />
      <CoreValue isEditable={isEditMode} />
      <Schedule isEditable={isEditMode} />
      <Executives
        isEditable={isEditMode}
        selectedExec={selectedExec}
        onChangeSelectedExec={onChangeSelectedExec}
      />

      <ActionModal
        variant="deploy"
        isOpen={isDeployModalOpen}
        onCancel={() => setEditStep(EDIT_STEP.EDITING)}
        onAction={handleDeploy}
        alertText="배포하시겠습니까?"
        description="입력한 소개 탭 내용은 공홈에 즉시 반영돼요."
      />
    </StContainer>
  );
};

const AboutSection = (props: AboutSectionProps) => {
  return (
    <ToastProvider>
      <AboutSectionContent {...props} />
    </ToastProvider>
  );
};

export default AboutSection;
