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
import CurriculumSection from '@/components/org/OrgAdmin/RecruitSection/_components/Curriculum';
import FaqSection from '@/components/org/OrgAdmin/RecruitSection/_components/Faq';
import HeaderSection from '@/components/org/OrgAdmin/RecruitSection/_components/Header';
import PartIntroSection from '@/components/org/OrgAdmin/RecruitSection/_components/PartIntroduction';
import { syncRecruitFormFromAdminData } from '@/components/org/OrgAdmin/RecruitSection/_utils/syncRecruitFormFromAdminData';
import { useDeployRecruitMutation } from '@/components/org/OrgAdmin/RecruitSection/queries';
import {
  StRecruitContainer,
  StRecruitSectionWrapper,
} from '@/components/org/OrgAdmin/RecruitSection/style';
import { validationRecruitInputs } from '@/components/org/OrgAdmin/utils';
import { PART_KO, PART_LIST, VALIDATION_CHECK } from '@/utils/org';

type SelectedParts = {
  intro: PART_KO;
  curriculum: PART_KO;
  fna: PART_KO;
};

const RECRUIT_FIELD_NAMES = [
  'recruitHeaderImage',
  ...PART_LIST.map((part) => `partIntroduction${part}`),
  'partCurriculum',
  'recruitPartCurriculum',
  'recruitQuestion',
];

const RecruitSectionContent = () => {
  const [selectedParts, setSelectedParts] = useState<SelectedParts>({
    intro: '기획',
    curriculum: '기획',
    fna: '기획',
  });
  const [editStep, setEditStep] = useState<EditStep>(EDIT_STEP.VIEW);
  const [restoreSignal, setRestoreSignal] = useState(0);
  const [snapshot, setSnapshot] = useState<unknown[] | null>(null);

  const { data } = useAdminInfoQuery();
  const { mutate: deployRecruit, isLoading: isDeploying } =
    useDeployRecruitMutation();

  const { control, getValues, setError, setValue, clearErrors } =
    useFormContext();

  const watchedValues = useWatch({ control, name: RECRUIT_FIELD_NAMES });

  const isEditMode = editStep !== EDIT_STEP.VIEW;
  const isDeployModalOpen = editStep === EDIT_STEP.DEPLOY;
  const hasUnsavedChanges =
    isEditMode &&
    snapshot !== null &&
    JSON.stringify(watchedValues) !== JSON.stringify(snapshot);

  useEffect(() => {
    syncRecruitFormFromAdminData(data, setValue);
  }, [data, setValue]);

  const validateRecruitTabInputs = () => {
    const { recruitHeaderImage: headerImage } = getValues();

    if (!headerImage?.fileName && !data?.recruitHeaderImage) {
      setError('recruitHeaderImage', {
        type: 'required',
        message: VALIDATION_CHECK.required.errorText,
      });
      return false;
    }

    return validationRecruitInputs(
      getValues,
      setError,
      onChangeIntroPart,
      onChangeCurriculumPart,
      onChangeFnaPart,
    );
  };

  const onChangeIntroPart = (part: PART_KO) => {
    setSelectedParts((prev) => ({ ...prev, intro: part }));
  };

  const onChangeCurriculumPart = (part: PART_KO) => {
    setSelectedParts((prev) => ({ ...prev, curriculum: part }));
  };

  const onChangeFnaPart = (part: PART_KO) => {
    setSelectedParts((prev) => ({ ...prev, fna: part }));
  };

  const startEditMode = () => {
    setSnapshot(JSON.parse(JSON.stringify(getValues(RECRUIT_FIELD_NAMES))));
    setEditStep(EDIT_STEP.EDITING);
  };

  const exitEditMode = () => {
    setValue('recruitHeaderImage', undefined, {
      shouldDirty: false,
      shouldValidate: false,
    });
    clearErrors('recruitHeaderImage');
    syncRecruitFormFromAdminData(data, setValue);
    setRestoreSignal((prev) => prev + 1);
    setSnapshot(null);
    setEditStep(EDIT_STEP.VIEW);
  };

  const handleDeploy = () => {
    deployRecruit(
      {
        values: getValues(),
        existingRecruitHeaderImageUrl: data?.recruitHeaderImage,
      },
      {
        onSuccess: exitEditMode,
      },
    );
  };

  return (
    <>
      <EditActionBar
        isEditMode={isEditMode}
        isDeploying={isDeploying}
        hasUnsavedChanges={hasUnsavedChanges}
        onStartEdit={startEditMode}
        onCancel={exitEditMode}
        onDeploy={() => {
          if (validateRecruitTabInputs()) {
            setEditStep(EDIT_STEP.DEPLOY);
          }
        }}
      />
      <StRecruitSectionWrapper>
        <HeaderSection isEditable={isEditMode} />
        <PartIntroSection
          restoreSignal={restoreSignal}
          isEditable={isEditMode}
          selectedPart={selectedParts.intro}
          onChangePart={onChangeIntroPart}
        />
        <CurriculumSection
          isEditable={isEditMode}
          selectedPart={selectedParts.curriculum}
          onChangeSelectedPart={onChangeCurriculumPart}
        />
        <FaqSection
          restoreSignal={restoreSignal}
          isEditable={isEditMode}
          fnaPart={selectedParts.fna}
          onChangeFnaPart={onChangeFnaPart}
        />
      </StRecruitSectionWrapper>

      <ActionModal
        title="배포하시겠습니까?"
        isOpen={isDeployModalOpen}
        onCancel={() => setEditStep(EDIT_STEP.EDITING)}
        onAction={handleDeploy}
      />
    </>
  );
};

const RecruitSection = () => {
  return (
    <StRecruitContainer>
      <ToastProvider>
        <RecruitSectionContent />
      </ToastProvider>
    </StRecruitContainer>
  );
};

export default RecruitSection;
