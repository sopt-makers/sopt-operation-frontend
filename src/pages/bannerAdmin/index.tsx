import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import CreateBannerModal from '@/components/bannerAdmin/CreateBannerModal';
import Header from '@/components/bannerAdmin/Header/Header';

import BannerList from '@/components/bannerAdmin/BannerList/BannerList';

import FloatingButton from '@/components/common/FloatingButton';
import Modal from '@/components/common/modal';
import { BANNER_TAB_FILTER_LIST } from '@/constants';
import { BANNER_STATUS_LIST } from '@/utils/alarm';
import { bannerStatusTranslator } from '@/utils/translator';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { SelectV2, Tab } from '@sopt-makers/ui';

const BannerAdminPage = () => {
  const [tab, setTab] = useState<BANNER_STATUS>('ALL');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('진행 상태 순');

  const handleChangeTab = (value: BANNER_STATUS) => {
    setTab(value);
  };

  const handleSelectFilter = (selectedAttribute: string): void => {
    setFilter(selectedAttribute);
  };

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
        <StLayout>
          <Tab<BANNER_STATUS>
            style="primary"
            size="md"
            tabItems={BANNER_STATUS_LIST}
            translator={bannerStatusTranslator}
            selectedInitial={tab}
            onChange={handleChangeTab}
          />
          <SelectV2.Root
            visibleOptions={3}
            onChange={handleSelectFilter}
            type="text">
            <SelectV2.Trigger
              css={{
                '& > svg': {
                  flexShrink: 0,
                },
              }}>
              <SelectV2.TriggerContent placeholder={filter} />
            </SelectV2.Trigger>
            <SelectV2.Menu>
              {BANNER_TAB_FILTER_LIST.map((filterItem) => (
                <SelectV2.MenuItem
                  key={filterItem}
                  option={{ value: filterItem, label: filterItem }}
                />
              ))}
            </SelectV2.Menu>
          </SelectV2.Root>
        </StLayout>
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

const StLayout = styled.div`
  display: flex;

  align-items: center;
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
