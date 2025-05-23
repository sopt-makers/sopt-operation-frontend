import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { SelectV2, Tab } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';

import { IcPaginationLeft, IcPaginationRight } from '@/assets/icons';
import BannerList from '@/components/bannerAdmin/BannerList/BannerList';
import CreateBannerModal from '@/components/bannerAdmin/CreateBannerModal';
import Header from '@/components/bannerAdmin/Header/Header';
import FloatingButton from '@/components/common/FloatingButton';
import Modal from '@/components/common/modal';
import {
  BANNER_TAB_FILTER_LIST,
  DEFAULT_BANNER_LIST_LIMIT,
  DEFAULT_BANNER_LIST_MAX,
  INIT_BANNER_LIST_PAGE,
} from '@/constants';
import { useFetchBannerList } from '@/services/api/banner/query';
import { getBannerSort, getBannerStatus } from '@/utils';
import { BANNER_STATUS_LIST } from '@/utils/alarm';
import { bannerStatusTranslator } from '@/utils/translator';

const CLOSE_MODAL = -1;
export const CREATE_MODAL = 0;
const BACKWARD_PAGE_BUTTON_COUNT = 2;
const ADDITIONAL_PAGE_BUTTON_COUNT = 4;

const BannerAdminPage = () => {
  const [modalState, setModalState] = useState<number>(CLOSE_MODAL);
  const [tab, setTab] = useState<BANNER_STATUS>(BANNER_STATUS_LIST[0]);
  const [filter, setFilter] = useState<BANNER_FILTER>(
    BANNER_TAB_FILTER_LIST[0] as BANNER_FILTER,
  );
  const [currentPage, setCurrentPage] = useState(INIT_BANNER_LIST_PAGE);

  const { data: entireBannerList } = useFetchBannerList(
    '',
    'status',
    INIT_BANNER_LIST_PAGE,
    DEFAULT_BANNER_LIST_MAX,
  );
  const { data: selectedTabBannerList } = useFetchBannerList(
    getBannerStatus(tab),
    getBannerSort(filter),
    currentPage,
    DEFAULT_BANNER_LIST_LIMIT,
  );

  const bannerList = Array.isArray(selectedTabBannerList?.banners)
    ? selectedTabBannerList.banners
    : [];

  const totalPages = selectedTabBannerList?.totalPage || 1;
  const hasNextPage = selectedTabBannerList?.hasNextPage || false;
  const hasPrevPage = selectedTabBannerList?.hasPrevPage || false;

  const handleChangeTab = (value: BANNER_STATUS) => {
    setTab(value);
    setCurrentPage(INIT_BANNER_LIST_PAGE);
  };

  const handleSelectFilter = (filter: BANNER_FILTER) => {
    setFilter(filter);
    setCurrentPage(INIT_BANNER_LIST_PAGE);
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

  const renderPaginationButtons = () => {
    const pageButtons = [];
    let startPage = Math.max(1, currentPage - BACKWARD_PAGE_BUTTON_COUNT);
    let endPage = Math.min(
      totalPages,
      startPage + ADDITIONAL_PAGE_BUTTON_COUNT,
    );

    if (endPage - startPage < ADDITIONAL_PAGE_BUTTON_COUNT) {
      startPage = Math.max(1, endPage - ADDITIONAL_PAGE_BUTTON_COUNT);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <StPageButton
          key={i}
          onClick={() => handlePageChange(i)}
          active={i === currentPage}>
          {i}
        </StPageButton>,
      );
    }
    return pageButtons;
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
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!hasPrevPage}>
              <IcPaginationLeft />
            </button>
            {renderPaginationButtons()}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNextPage}>
              <IcPaginationRight />
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

  padding-bottom: 7.2rem;

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

  margin-top: 2rem;

  justify-content: center;
  align-items: center;
  gap: 1.2rem;

  svg {
    path {
      stroke: ${colors.gray200};
    }
  }

  button:first-of-type {
    margin-right: 1.2rem;
  }

  button:last-of-type {
    margin-left: 1.2rem;
  }

  button:disabled {
    cursor: not-allowed;
    svg {
      path {
        stroke: ${colors.gray700};
      }
    }
  }

  button:hover:not(:disabled) {
    svg {
      path {
        stroke: ${colors.white};
        transition: all 0.3s ease-in;
      }
    }
  }
`;

const StPageButton = styled.button<{ active: boolean }>`
  display: flex;

  width: 4rem;
  height: 4rem;
  padding: 1.1rem 0.8rem;

  justify-content: center;
  align-items: center;

  border-radius: 2rem;

  background-color: ${({ active }) => active && colors.gray10};
  color: ${({ active }) => (active ? colors.gray950 : colors.gray200)};

  ${fontsObject.HEADING_6_18_B};

  &:hover {
    color: ${colors.white};
    transition: all 0.2s ease-in;
  }
`;
