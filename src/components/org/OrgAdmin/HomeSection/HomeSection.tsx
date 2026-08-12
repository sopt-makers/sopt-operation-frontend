import { ToastProvider } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ActionModal } from '@/components/org/OrgAdmin/common/ActionModal';
import {
  EDIT_STEP,
  type EditStep,
} from '@/components/org/OrgAdmin/common/constants/editStep';
import { EditActionBar } from '@/components/org/OrgAdmin/common/EditActionBar';
import HomeHeaderSection from '@/components/org/OrgAdmin/HomeSection/_components/Header/HomeHeaderSection';
import type { News } from '@/components/org/OrgAdmin/HomeSection/_components/News/NewsItem';
import NewsSection from '@/components/org/OrgAdmin/HomeSection/_components/News/NewsSection';
import ReviewSection from '@/components/org/OrgAdmin/HomeSection/_components/Review/ReviewSection';
import type { Review } from '@/components/org/OrgAdmin/HomeSection/_types/types';
import { isSameOrder } from '@/components/org/OrgAdmin/HomeSection/_utils/isSameOrder';
import { reconcileWithServerData } from '@/components/org/OrgAdmin/HomeSection/_utils/reconcileWithServerData';
import { extractFileNameFromUrl } from '@/components/org/OrgAdmin/HomeSection/api';
import {
  useAdminInfoQuery,
  useDeployHomeMutation,
  useReviewsQuery,
} from '@/components/org/OrgAdmin/HomeSection/queries';
import {
  StContainer,
  StSectionWrapper,
} from '@/components/org/OrgAdmin/HomeSection/style';
import { VALIDATION_CHECK } from '@/utils/org';

type HomeDraft = {
  reviews: Review[];
  news: News[];
};

const EMPTY_REVIEWS: Review[] = [];
const EMPTY_NEWS: News[] = [];

interface HomeSectionProps {
  onEditModeChange: (isEditing: boolean) => void;
}

const HomeSectionContent = ({ onEditModeChange }: HomeSectionProps) => {
  const [editStep, setEditStep] = useState<EditStep>(EDIT_STEP.VIEW);
  const [draft, setDraft] = useState<HomeDraft>({
    reviews: EMPTY_REVIEWS,
    news: EMPTY_NEWS,
  });

  const { data } = useAdminInfoQuery();
  const { data: reviewsData } = useReviewsQuery();
  const { mutate: deployHome, isLoading: isDeploying } =
    useDeployHomeMutation();

  const initialReviews = reviewsData ?? EMPTY_REVIEWS;
  const latestNews = data?.latestNews ?? EMPTY_NEWS;
  const { control, getValues, setError, setFocus, setValue, clearErrors } =
    useFormContext();
  const homeHeaderImage = useWatch({
    control,
    name: 'homeHeaderImageFileName',
  });

  const isEditMode = editStep !== EDIT_STEP.VIEW;
  const isDeployModalOpen = editStep === EDIT_STEP.DEPLOY;

  useEffect(() => {
    if (isEditMode) {
      // 편집 중엔 로컬 재정렬(드래그 순서)을 그대로 유지하되, 그 사이 추가/삭제된
      // 항목만 반영한다. 서버 데이터로 통째로 덮어쓰면 로컬 순서가 날아가고
      // (리뷰 수정 시 순서 초기화 버그), 반대로 아예 무시하면 편집 중 새로
      // 추가한 항목이 draft에 안 실려 배포 시 누락된다.
      setDraft((prev) => ({
        reviews: reconcileWithServerData(prev.reviews, initialReviews),
        news: reconcileWithServerData(prev.news, latestNews),
      }));
      return;
    }

    setDraft({
      reviews: initialReviews,
      news: latestNews,
    });
  }, [initialReviews, isEditMode, latestNews]);

  const resetDraft = () => {
    setDraft({
      reviews: initialReviews,
      news: latestNews,
    });
  };

  const hasUnsavedChanges =
    isEditMode &&
    (Boolean(homeHeaderImage?.file) ||
      !isSameOrder(initialReviews, draft.reviews) ||
      !isSameOrder(latestNews, draft.news));

  useEffect(() => {
    onEditModeChange(isEditMode);
  }, [isEditMode, onEditModeChange]);

  const validateHomeInputs = () => {
    const { homeHeaderImageFileName } = getValues();

    if (!homeHeaderImageFileName?.fileName && !data?.homeHeaderImage) {
      setError('homeHeaderImageFileName', {
        type: 'required',
        message: VALIDATION_CHECK.required.errorText,
      });
      setFocus('homeHeaderImageFileName');
      return false;
    }

    return true;
  };

  const exitEditMode = () => {
    setValue('homeHeaderImageFileName', undefined, {
      shouldDirty: false,
      shouldValidate: false,
    });
    clearErrors('homeHeaderImageFileName');
    resetDraft();
    setEditStep(EDIT_STEP.VIEW);
  };

  const handleDeploy = () => {
    const { homeHeaderImageFileName } = getValues();
    const homeHeaderImageFileNameValue =
      homeHeaderImageFileName?.fileName ??
      (data?.homeHeaderImage
        ? extractFileNameFromUrl(data.homeHeaderImage)
        : '');

    deployHome(
      {
        homeHeaderImageFileName: homeHeaderImageFileNameValue,
        homeHeaderImageFile: homeHeaderImageFileName?.file,
        reviewItems: draft.reviews,
        newsItems: draft.news,
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
        onStartEdit={() => setEditStep(EDIT_STEP.EDITING)}
        onCancel={exitEditMode}
        onDeploy={() => {
          if (validateHomeInputs()) {
            setEditStep(EDIT_STEP.DEPLOY);
          }
        }}
      />
      <StSectionWrapper>
        <HomeHeaderSection isEditable={isEditMode} />
        <ReviewSection
          isEditable={isEditMode}
          reviews={draft.reviews}
          onChangeReviews={(reviews) =>
            setDraft((prev) => ({ ...prev, reviews }))
          }
        />
        <NewsSection
          isEditable={isEditMode}
          newsItems={draft.news}
          onChangeNews={(news) => setDraft((prev) => ({ ...prev, news }))}
        />
      </StSectionWrapper>

      <ActionModal
        isOpen={isDeployModalOpen}
        title="배포하시겠습니까?"
        onCancel={() => setEditStep(EDIT_STEP.EDITING)}
        onAction={handleDeploy}
      />
    </>
  );
};

const HomeSection = (props: HomeSectionProps) => {
  return (
    <StContainer>
      <ToastProvider>
        <HomeSectionContent {...props} />
      </ToastProvider>
    </StContainer>
  );
};

export default HomeSection;
