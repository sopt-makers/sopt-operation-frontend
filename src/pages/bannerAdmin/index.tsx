import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import CreateBannerModal from '@/components/bannerAdmin/CreateBannerModal';
import Header from '@/components/bannerAdmin/Header/Header';

import BannerList from '@/components/bannerAdmin/BannerList/BannerList';
import FloatingButton from '@/components/common/FloatingButton';
import Modal from '@/components/common/modal';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

const BannerAdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <StWrapper>
        <StTitle>광고 배너 관리</StTitle>
        <StBannerList>
          <Header />
          <StBannerListWrapper>
            <BannerList />
          </StBannerListWrapper>
        </StBannerList>
      </StWrapper>
      {isModalOpen && (
        <Modal>
          <CreateBannerModal onClose={() => setIsModalOpen(!isModalOpen)} />
        </Modal>
      )}
      <FloatingButton
        content={<>배너 등록</>}
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
    </>
  );
};

export default BannerAdminPage;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4.9rem;
`;

const StTitle = styled.h1`
  color: ${colors.white};

  ${fontsObject.TITLE_1_32_SB}
`;

const StBannerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
`;

const StBannerListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
