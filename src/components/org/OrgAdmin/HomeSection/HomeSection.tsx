import { Button, ToastProvider } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import IcSend from '@/components/icons/IcSend';
import { ActionModal } from '@/components/org/OrgAdmin/common/ActionModal';
import HomeHeaderSection from '@/components/org/OrgAdmin/HomeSection/_components/Header/HomeHeaderSection';
import type { News } from '@/components/org/OrgAdmin/HomeSection/_components/News/NewsItem';
import NewsSection from '@/components/org/OrgAdmin/HomeSection/_components/News/NewsSection';
import ReviewSection from '@/components/org/OrgAdmin/HomeSection/_components/Review/ReviewSection';
import type { Review } from '@/components/org/OrgAdmin/HomeSection/_types/types';
import { isSameOrder } from '@/components/org/OrgAdmin/HomeSection/_utils/isSameOrder';
import { extractFileNameFromUrl } from '@/components/org/OrgAdmin/HomeSection/api';
import {
  useAdminInfoQuery,
  useDeployHomeMutation,
  useReviewsQuery,
} from '@/components/org/OrgAdmin/HomeSection/queries';
import {
  StContainer,
  StHomeActionButtonWrapper,
  StHomeActionWrapper,
  StHomeEditButtonWrapper,
  StSectionWrapper,
  StUnsavedChangeText,
} from '@/components/org/OrgAdmin/HomeSection/style';
import { VALIDATION_CHECK } from '@/utils/org';

const HOME_STATE = {
  VIEW: 'view',
  EDITING: 'editing',
  DEPLOY: 'deploy',
} as const;

type HomeState = (typeof HOME_STATE)[keyof typeof HOME_STATE];

type HomeDraft = {
  reviews: Review[];
  news: News[];
};

const EMPTY_REVIEWS: Review[] = [];
const EMPTY_NEWS: News[] = [];

const HomeSectionContent = () => {
  const [homeState, setHomeState] = useState<HomeState>(HOME_STATE.VIEW);
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
  const { control, getValues, setError, setValue, clearErrors } =
    useFormContext();
  const homeHeaderImage = useWatch({
    control,
    name: 'homeHeaderImageFileName',
  });

  const isEditMode = homeState !== HOME_STATE.VIEW;
  const isDeployModalOpen = homeState === HOME_STATE.DEPLOY;

  useEffect(() => {
    setDraft({
      reviews: initialReviews,
      news: latestNews,
    });
  }, [initialReviews, latestNews]);

  const resetDraft = () => {
    setDraft({
      reviews: initialReviews,
      news: latestNews,
    });
  };

  const hasUnsavedChanges =
    Boolean(homeHeaderImage?.file) ||
    !isSameOrder(initialReviews, draft.reviews) ||
    !isSameOrder(latestNews, draft.news);

  const validateHomeInputs = () => {
    const { homeHeaderImageFileName } = getValues();

    if (!homeHeaderImageFileName?.fileName && !data?.homeHeaderImage) {
      setError('homeHeaderImageFileName', {
        type: 'required',
        message: VALIDATION_CHECK.required.errorText,
      });
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
    setHomeState(HOME_STATE.VIEW);
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
      <StHomeEditButtonWrapper>
        {isEditMode ? (
          <StHomeActionWrapper>
            <StHomeActionButtonWrapper>
              <Button
                type="button"
                size="md"
                variant="outlined"
                css={{ width: 'fit-content' }}
                onClick={exitEditMode}>
                취소
              </Button>
              <Button
                theme="blue"
                type="button"
                size="md"
                LeftIcon={IcSend}
                disabled={isDeploying}
                onClick={() => {
                  if (validateHomeInputs()) {
                    setHomeState(HOME_STATE.DEPLOY);
                  }
                }}>
                배포
              </Button>
            </StHomeActionButtonWrapper>
            {hasUnsavedChanges && (
              <StUnsavedChangeText>
                저장되지 않은 변경사항이 있습니다.
              </StUnsavedChangeText>
            )}
          </StHomeActionWrapper>
        ) : (
          <Button
            type="button"
            size="md"
            variant="outlined"
            onClick={() => setHomeState(HOME_STATE.EDITING)}>
            수정하기
          </Button>
        )}
      </StHomeEditButtonWrapper>
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
        variant="deploy"
        isOpen={isDeployModalOpen}
        onCancel={() => setHomeState(HOME_STATE.EDITING)}
        onAction={handleDeploy}
        alertText="배포하시겠습니까?"
        description="입력한 홈 탭 내용은 공홈에 즉시 반영돼요."
      />
    </>
  );
};

const HomeSection = () => {
  return (
    <StContainer>
      <ToastProvider>
        <HomeSectionContent />
      </ToastProvider>
    </StContainer>
  );
};

export default HomeSection;
