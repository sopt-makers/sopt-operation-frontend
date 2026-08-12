import { Button } from '@sopt-makers/ui';

import IcSend from '@/components/icons/IcSend';

import {
  StEditActionBarWrapper,
  StEditActionButtonWrapper,
  StEditActionWrapper,
  StUnsavedChangeText,
} from './style';

type EditActionBarProps = {
  isEditMode: boolean;
  isDeploying?: boolean;
  hasUnsavedChanges?: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  onDeploy: () => void;
};

export const EditActionBar = ({
  isEditMode,
  isDeploying = false,
  hasUnsavedChanges = false,
  onStartEdit,
  onCancel,
  onDeploy,
}: EditActionBarProps) => (
  <StEditActionBarWrapper>
    {isEditMode ? (
      <StEditActionWrapper>
        <StEditActionButtonWrapper>
          <Button
            type="button"
            size="md"
            variant="outlined"
            css={{ width: 'fit-content' }}
            onClick={onCancel}>
            취소
          </Button>
          <Button
            theme="blue"
            type="button"
            size="md"
            LeftIcon={IcSend}
            disabled={isDeploying}
            onClick={onDeploy}>
            배포
          </Button>
        </StEditActionButtonWrapper>
        {hasUnsavedChanges && (
          <StUnsavedChangeText>
            저장되지 않은 변경사항이 있습니다.
          </StUnsavedChangeText>
        )}
      </StEditActionWrapper>
    ) : (
      <Button type="button" size="md" variant="outlined" onClick={onStartEdit}>
        수정하기
      </Button>
    )}
  </StEditActionBarWrapper>
);
