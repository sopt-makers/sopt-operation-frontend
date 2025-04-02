import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

import BannerTag from '@/components/bannerAdmin/BannerTag/BannerTag';
import DeleteBannerButton from '@/components/bannerAdmin/DeleteBannerButton';
import { ITEM_DUMMY_LIST } from '@/constants';
import { getTagColor } from '@/utils';
import BannerEditButton from '@/components/bannerAdmin/BannerEditButton';

interface ListItemProps {
  onEditModalOpen: (bannerId: number) => void;
}

const ListItem = ({ onEditModalOpen }: ListItemProps) => {
  return (
    <StItemWrapper>
      {ITEM_DUMMY_LIST.map((item) => (
        <StItem key={item.requester}>
          <StStatus status={item.status}>{item.status}</StStatus>
          <StBannerTagWrapper>
            <BannerTag color={getTagColor(item.bannerLocation)}>
              <p>{item.bannerLocation}</p>
            </BannerTag>
          </StBannerTagWrapper>
          <StBannerTagWrapper>
            <BannerTag color={`${colors.gray700}`}>
              {item.contentType}
            </BannerTag>
          </StBannerTagWrapper>
          <p>{item.requester}</p>
          <p>{item.startedAt}</p>
          <p>{item.endedAt}</p>
          <StButtonLayout>
            <BannerEditButton onEditModalOpen={onEditModalOpen} bannerId={19} />
            <DeleteBannerButton bannerId={18} />
          </StButtonLayout>
        </StItem>
      ))}
    </StItemWrapper>
  );
};

export default ListItem;

export const StItemWrapper = styled.li`
  display: flex;

  width: 100%;

  padding: 0 3.4rem 0 0rem;

  border: 1px solid ${colors.gray700};
  border-radius: 1rem;

  align-items: center;

  &:hover {
    background-color: ${colors.gray800};
  }
`;

export const StStatus = styled.h4<{ status: string }>`
  ${fontsObject.TITLE_6_16_SB}

  ${({ status }) => {
    if (status === '진행 예정') {
      return css`
        color: ${colors.secondary};
      `;
    }
    if (status === '진행 중') {
      return css`
        color: ${colors.success};
      `;
    }
    if (status === '진행 종료') {
      return css`
        color: ${colors.error};
      `;
    }
  }}
`;

export const StItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.1fr 1fr 1fr 1fr 0.2fr;

  width: 100%;

  padding: 3.3rem 0;

  text-align: center;
  align-items: center;

  & > p {
    color: ${colors.gray100};

    ${fontsObject.BODY_3_14_M}
  }

  & > h4 {
    margin-left: 3.5rem;

    text-align: left;
  }

  & > p:nth-child(6) {
    text-align: left;
    margin-left: 1.5rem;
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
`;
