import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import CreateBannerModal from '@/components/bannerAdmin/CreateBannerModal';
import Header from '@/components/bannerAdmin/Header/Header';
import ListItem from '@/components/bannerAdmin/ListItem/ListItem';
import FloatingButton from '@/components/common/FloatingButton';
import Modal from '@/components/common/modal';
import { useGetBannerList } from '@/services/api/banner/query';

const CLOSE_MODAL = -1;
const CREATE_MODAL = 0;

const BannerAdminPage = () => {
  const [isModalState, setIsModalState] = useState<number>(CLOSE_MODAL);

  const handleCloseModal = () => {
    setIsModalState(CLOSE_MODAL);
  };

  const handleOpenModal = (modalState: number) => {
    setIsModalState(modalState);
  };

  useEffect(() => {
    if (isModalState !== CLOSE_MODAL) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalState]);

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
      {isModalState !== CLOSE_MODAL && (
        <Modal>
          <CreateBannerModal onCloseModal={handleCloseModal} />
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
