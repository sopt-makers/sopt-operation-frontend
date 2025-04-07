import BannerEditButton from '@/components/bannerAdmin/BannerEditButton';

import BannerTag from '@/components/bannerAdmin/BannerTag/BannerTag';
import DeleteBannerButton from '@/components/bannerAdmin/DeleteBannerButton';

import {
  getTagColor,
  translateContentType,
  translateLocation,
  translateStatus,
} from '@/utils';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

interface BannerListProps {
  onEditModalOpen: (modalState: number) => void;
  bannerList: Banner[];
}

const BannerList = ({ onEditModalOpen, bannerList }: BannerListProps) => {
  return (
    <StItemWrapper>
      {bannerList?.map((banner) => (
        <StItem key={banner.id}>
          <StStatus status={banner.status}>
            {translateStatus(banner.status)}
          </StStatus>
          <StBannerTagWrapper>
            <BannerTag color={getTagColor(banner.location)}>
              <p>{translateLocation(banner.location)}</p>
            </BannerTag>
          </StBannerTagWrapper>
          <StBannerTagWrapper>
            <BannerTag color={`${colors.gray700}`}>
              {translateContentType(banner.content_type)}
            </BannerTag>
          </StBannerTagWrapper>
          <p>{banner.publisher}</p>
          <p>{banner.start_date.replaceAll('-', '.')}</p>
          <p>{banner.end_date.replaceAll('-', '.')}</p>
          <StButtonLayout>
            {banner.status !== 'done' ? (
              <>
                <BannerEditButton
                  onEditModalOpen={onEditModalOpen}
                  bannerId={banner.id}
                />
                <DeleteBannerButton bannerId={banner.id} />
              </>
            ) : (
              <StEmptyBox />
            )}
          </StButtonLayout>
        </StItem>
      ))}
    </StItemWrapper>
  );
};

export default BannerList;

export const StItemWrapper = styled.li`
  display: flex;

  width: 100%;

  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const StStatus = styled.h4<{ status: string }>`
  ${fontsObject.TITLE_6_16_SB}

  ${({ status }) => {
    if (status === 'reserved') {
      return css`
        color: ${colors.secondary};
      `;
    }
    if (status === 'in_progress') {
      return css`
        color: ${colors.success};
      `;
    }
    if (status === 'done') {
      return css`
        color: ${colors.error};
      `;
    }
  }}
`;

export const StItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.1fr 1fr 1fr 1.2fr 0.2fr;

  width: 100%;

  padding: 3.3rem 3.4rem 3.3rem 0;

  border: 1px solid ${colors.gray700};
  border-radius: 1rem;

  text-align: center;
  align-items: center;

  white-space: nowrap;

  & > p {
    max-width: 12rem;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    color: ${colors.gray100};

    ${fontsObject.BODY_3_14_M}
  }

  & > h4 {
    margin-left: 3.5rem;
    text-align: left;
  }

  & > p:nth-child(4) {
    margin-left: 1rem;
    text-align: center;
  }

  &:hover {
    background-color: ${colors.gray800};
  }
`;

export const StButtonLayout = styled.div`
  display: flex;

  padding: 0.4rem;

  align-items: center;
  gap: 1.2rem;

  cursor: pointer;
  box-sizing: content-box;
`;

const StBannerTagWrapper = styled.div`
  display: flex;
  justify-content: center;

  & > p {
    ${fontsObject.LABEL_3_14_SB}
  }
`;

const StEmptyBox = styled.div`
  width: 5.6rem;
`;
