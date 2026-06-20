import { Button, ToastProvider } from '@sopt-makers/ui';
import { useCallback, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import IcSend from '@/components/icons/IcSend';
import { ActionModal } from '@/components/org/OrgAdmin/common/ActionModal';
import HomeHeaderSection from '@/components/org/OrgAdmin/HomeSection/_components/Header/HomeHeaderSection';
import type { News } from '@/components/org/OrgAdmin/HomeSection/_components/News/NewsItem';
import NewsSection from '@/components/org/OrgAdmin/HomeSection/_components/News/NewsSection';
import ReviewSection from '@/components/org/OrgAdmin/HomeSection/_components/Review/ReviewSection';
import type { Review } from '@/components/org/OrgAdmin/HomeSection/_types/types';
import {
  useAdminInfoQuery,
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

const isSameOrder = <T extends { id: number }>(
  prevItems: T[],
  nextItems: T[],
) =>
  prevItems.length === nextItems.length &&
  prevItems.every((item, index) => item.id === nextItems[index]?.id);

const EMPTY_REVIEWS: Review[] = [];
const EMPTY_NEWS: News[] = [];

const HomeSectionContent = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [reviewItems, setReviewItems] = useState<Review[]>([]);
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [resetKey, setResetKey] = useState(0);

  const { data } = useAdminInfoQuery();
  const { data: reviewsData } = useReviewsQuery();
  const initialReviewItems = reviewsData ?? EMPTY_REVIEWS;
  const { control, getValues, setError, setValue, clearErrors } =
    useFormContext();
  const homeHeaderImage = useWatch({
    control,
    name: 'homeHeaderImageFileName',
  });
  const latestNews = data?.latestNews ?? EMPTY_NEWS;

  const handleChangeReviews = useCallback((reviews: Review[]) => {
    setReviewItems(reviews);
  }, []);

  const handleChangeNews = useCallback((news: News[]) => {
    setNewsItems(news);
  }, []);

  const hasUnsavedChanges =
    Boolean(homeHeaderImage?.file) ||
    !isSameOrder(initialReviewItems, reviewItems) ||
    !isSameOrder(latestNews, newsItems);

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

  const handleClickEditButton = () => {
    setIsEditMode(true);
  };

  const handleClickCancelButton = () => {
    setValue('homeHeaderImageFileName', undefined, {
      shouldDirty: false,
      shouldValidate: false,
    });
    clearErrors('homeHeaderImageFileName');
    setReviewItems(initialReviewItems);
    setNewsItems(latestNews);
    setResetKey((prev) => prev + 1);
    setIsActionModalOpen(false);
    setIsEditMode(false);
  };

  const handleClickDeployButton = () => {
    if (validateHomeInputs()) {
      setIsActionModalOpen(true);
    }
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
                onClick={handleClickCancelButton}>
                취소
              </Button>
              <Button
                theme="blue"
                type="button"
                size="md"
                LeftIcon={IcSend}
                onClick={handleClickDeployButton}>
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
            onClick={handleClickEditButton}>
            수정하기
          </Button>
        )}
      </StHomeEditButtonWrapper>
      <StSectionWrapper>
        <HomeHeaderSection isEditable={isEditMode} />
        <ReviewSection
          key={resetKey}
          isEditable={isEditMode}
          onChangeReviews={handleChangeReviews}
        />
        <NewsSection
          key={resetKey}
          latestNews={latestNews}
          isEditable={isEditMode}
          onChangeNews={handleChangeNews}
        />
      </StSectionWrapper>

      <ActionModal
        variant="deploy"
        isOpen={isActionModalOpen}
        onCancel={() => setIsActionModalOpen(false)}
        onAction={() => {
          setIsActionModalOpen(false);
          setIsEditMode(false);
        }}
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
