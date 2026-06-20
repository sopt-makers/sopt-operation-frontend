import { Button, ToastProvider } from '@sopt-makers/ui';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ActionModal } from '@/components/org/OrgAdmin/common/ActionModal';
import HomeHeaderSection from '@/components/org/OrgAdmin/HomeSection/_components/Header/HomeHeaderSection';
import NewsSection from '@/components/org/OrgAdmin/HomeSection/_components/News/NewsSection';
import ReviewSection from '@/components/org/OrgAdmin/HomeSection/_components/Review/ReviewSection';
import { useAdminInfoQuery } from '@/components/org/OrgAdmin/HomeSection/queries';
import {
  StContainer,
  StHomeEditButtonWrapper,
  StSectionWrapper,
} from '@/components/org/OrgAdmin/HomeSection/style';
import { VALIDATION_CHECK } from '@/utils/org';

const HomeSectionContent = () => {
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  const { data } = useAdminInfoQuery();
  const { getValues, setError } = useFormContext();

  const validateHomeInputs = () => {
    const { homeHeaderImageFileName } = getValues();

    if (!homeHeaderImageFileName?.fileName) {
      setError('homeHeaderImageFileName', {
        type: 'required',
        message: VALIDATION_CHECK.required.errorText,
      });
      return false;
    }

    return true;
  };


  const handleClickEditButton = () => {
    if (validateHomeInputs()) {
      setIsActionModalOpen(true);
    }
  };

  return (
    <>
      <StHomeEditButtonWrapper>
        <Button
          type="button"
          size="sm"
          variant="outlined"
          onClick={handleClickEditButton}>
          수정하기
        </Button>
      </StHomeEditButtonWrapper>
      <StSectionWrapper>
        <HomeHeaderSection />
        <ReviewSection reviews={data?.review ?? []} />
        <NewsSection latestNews={data?.latestNews} />
      </StSectionWrapper>
      <ActionModal
        variant="deploy"
        isOpen={isActionModalOpen}
        onCancel={() => setIsActionModalOpen(false)}
        onAction={() => handleClickEditButton()}
        alertText="수정하시겠습니까?"
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
