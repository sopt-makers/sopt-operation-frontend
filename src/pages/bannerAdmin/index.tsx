import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import CreateBannerModal from '@/components/bannerAdmin/CreateBannerModal';
import Header from '@/components/bannerAdmin/Header/Header';
import ListItem from '@/components/bannerAdmin/ListItem/ListItem';
import FloatingButton from '@/components/common/FloatingButton';
import Modal from '@/components/common/modal';
import { useGetBannerList } from '@/services/api/banner/query';

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

  const data = useGetBannerList();
  console.log(data);
  return (
    <>
      <StLayout>
        <Header />
        <StItemWrapper>
          <ListItem />
        </StItemWrapper>
      </StLayout>
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
