import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import CreateBannerModal from '@/components/bannerAdmin/CreateBannerModal';
import Header from '@/components/bannerAdmin/Header/Header';
import ListItem from '@/components/bannerAdmin/ListItem/ListItem';
import FloatingButton from '@/components/common/FloatingButton';
import Modal from '@/components/common/modal';
import { useGetBannerList } from '@/services/api/banner/query';

const CLOSE_MODAL = -1;
export const CREATE_MODAL = 0;

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

  const data = useGetBannerList();
  console.log(data);
  return (
    <>
      <StLayout>
        <Header />
        <StItemWrapper>
          <ListItem onEditModalOpen={handleOpenModal} />
        </StItemWrapper>
      </StLayout>
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

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
`;

const StItemWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
