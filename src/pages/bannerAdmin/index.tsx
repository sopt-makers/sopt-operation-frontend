import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import BannerList from '@/components/bannerAdmin/BannerList/BannerList';
import CreateBannerModal from '@/components/bannerAdmin/CreateBannerModal';
import Header from '@/components/bannerAdmin/Header/Header';

import FloatingButton from '@/components/common/FloatingButton';
import Modal from '@/components/common/modal';
import { BANNER_TAB_FILTER_LIST } from '@/constants';
import { useFetchBannerList } from '@/services/api/banner/query';
import { getBannerSort, getBannerStatus } from '@/utils';
import { BANNER_STATUS_LIST } from '@/utils/alarm';
import { bannerStatusTranslator } from '@/utils/translator';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { SelectV2, Tab } from '@sopt-makers/ui';

const CLOSE_MODAL = -1;
export const CREATE_MODAL = 0;

const BannerAdminPage = () => {
  const [modalState, setModalState] = useState<number>(CLOSE_MODAL);
  const [tab, setTab] = useState<BANNER_STATUS>(BANNER_STATUS_LIST[0]);
  const [filter, setFilter] = useState<BANNER_FILTER>(
    BANNER_TAB_FILTER_LIST[0] as BANNER_FILTER,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;

  const { data: entireBannerList } = useFetchBannerList('', 'status');
  const { data: selectedTabBannerList } = useFetchBannerList(
    getBannerStatus(tab),
    getBannerSort(filter),
    currentPage,
    limit,
  );

  const bannerList = Array.isArray(selectedTabBannerList?.banners)
    ? selectedTabBannerList.banners
    : [];

  const totalPages = selectedTabBannerList?.totalPage || 1;
  const hasNextPage = selectedTabBannerList?.hasNextPage || false;
  const hasPrevPage = selectedTabBannerList?.hasPrevPage || false;

  const handleChangeTab = (value: BANNER_STATUS) => {
    setTab(value);
    setCurrentPage(1);
  };

  const handleSelectFilter = (filter: BANNER_FILTER) => {
    setFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        <StLayout>
          <Tab<BANNER_STATUS>
            style="primary"
            size="md"
            tabItems={BANNER_STATUS_LIST}
            translator={bannerStatusTranslator(entireBannerList?.banners ?? [])}
            selectedInitial={tab}
            onChange={handleChangeTab}
            css={{ marginTop: 'auto', gap: '2.6rem' }}
          />
          <SelectV2.Root
            visibleOptions={3}
            onChange={(value) => handleSelectFilter(value as BANNER_FILTER)}
            defaultValue={{
              value: BANNER_TAB_FILTER_LIST[0],
              label: BANNER_TAB_FILTER_LIST[0],
            }}
            type="text">
            <SelectV2.Trigger>
              <SelectV2.TriggerContent
                placeholder={filter}
                css={{
                  '& > p': {
                    whiteSpace: 'nowrap',
                  },
                  marginBottom: '1.2rem',
                }}
              />
            </SelectV2.Trigger>
            <SelectV2.Menu>
              {BANNER_TAB_FILTER_LIST.map((filterItem) => (
                <SelectV2.MenuItem
                  key={filterItem}
                  option={{ value: filterItem, label: filterItem }}
                  onClick={() =>
                    handleSelectFilter(filterItem as BANNER_FILTER)
                  }
                />
              ))}
            </SelectV2.Menu>
          </SelectV2.Root>
        </StLayout>
        <StBannerList>
          <Header />
          <StBannerListWrapper>
            <BannerList
              onEditModalOpen={handleOpenModal}
              bannerList={bannerList}
            />
          </StBannerListWrapper>
          <StPagination>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!hasPrevPage}>
              이전
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNextPage}>
              다음
            </button>
          </StPagination>
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

const StLayout = styled.div`
  display: flex;

  align-items: center;

  border-bottom: 1px solid ${colors.gray800};
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

const StPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;

  button {
    padding: 0.5rem 1rem;
    background-color: ${colors.gray700};
    border: none;
    border-radius: 0.5rem;
    color: ${colors.white};
    cursor: pointer;

    &:disabled {
      background-color: ${colors.gray800};
      color: ${colors.gray500};
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: ${colors.gray600};
    }
  }

  span {
    color: ${colors.white};
    ${fontsObject.BODY_3_14_M}
  }
`;
