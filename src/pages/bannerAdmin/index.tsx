import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import CreateBannerModal from '@/components/bannerAdmin/CreateBannerModal';
import Header from '@/components/bannerAdmin/Header/Header';

import FloatingButton from '@/components/common/FloatingButton';
import Modal from '@/components/common/modal';

const CLOSE_MODAL = -1;
export const CREATE_MODAL = 0;

import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import BannerList from '@/components/bannerAdmin/BannerList/BannerList';

const BannerAdminPage = () => {
  const [modalState, setModalState] = useState<number>(CLOSE_MODAL);

  const handleCloseModal = () => {
    setModalState(CLOSE_MODAL);
  };

  const handleOpenModal = (modalState: number) => {
    setModalState(modalState);
  };

  useEffect(() => {
    if (modalState !== CLOSE_MODAL) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalState]);

  return (
    <>
      <StWrapper>
        <StTitle>광고 배너 관리</StTitle>
        <StBannerList>
          <Header />
          <StBannerListWrapper>
            <BannerList onEditModalOpen={handleOpenModal} />
          </StBannerListWrapper>
        </StBannerList>
      </StWrapper>
      {modalState !== CLOSE_MODAL && (
        <Modal>
          <CreateBannerModal
            onCloseModal={handleCloseModal}
            modalState={modalState}
          />
        </Modal>
      )}
      <FloatingButton
        content={<>배너 등록</>}
        onClick={() => handleOpenModal(CREATE_MODAL)}
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
