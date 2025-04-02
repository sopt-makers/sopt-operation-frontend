import { IcEdit, IcTrash } from '@/assets/icons';

import BannerTag from '@/components/bannerAdmin/BannerTag/BannerTag';
import { useFetchBannerList } from '@/services/api/banner/query';
import {
  getTagColor,
  translateContentType,
  translateLocation,
  translateStatus,
} from '@/utils';
import { replaceDateFormat } from '@/utils/date';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

const ListItem = () => {
  const { data } = useFetchBannerList();

  return (
    <StItemWrapper>
      {data?.map((item) => (
        <StItem>
          <StStatus status={item.status}>
            {translateStatus(item.status)}
          </StStatus>
          <StBannerTagWrapper location={item.location}>
            <BannerTag color={getTagColor(item.location)}>
              <p>{translateLocation(item.location)}</p>
            </BannerTag>
          </StBannerTagWrapper>
          <StBannerTagWrapper>
            <BannerTag color={`${colors.gray700}`}>
              {translateContentType(item.content_type)}
            </BannerTag>
          </StBannerTagWrapper>
          <p>{item.publisher}</p>
          <p>{replaceDateFormat(item.start_date)}</p>
          <p>{replaceDateFormat(item.end_date)}</p>
          <StButtonLayout>
            <IcEdit />
            <IcTrash />
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
  grid-template-columns: 1fr 1fr 1.1fr 1fr 1fr 1fr 0.2fr;

  width: 100%;

  padding: 3.3rem 3.4rem 3.3rem 0;

  border: 1px solid ${colors.gray700};
  border-radius: 1rem;

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

const StBannerTagWrapper = styled.div<{
  location?: string;
}>`
  display: flex;
  justify-content: center;

  & > p {
    ${fontsObject.LABEL_3_14_SB}

    ${({ location }) => {
      if (location === 'pg_community') {
        return css`
          color: rgba(88, 207, 5, 0.5);
        `;
      }
      if (location === 'cr_main') {
        return css`
          color: rgba(0, 174, 255, 0.5);
        `;
      }
      if (location === 'cr_feed') {
        return css`
          color: rgba(250, 115, 227, 0.5);
        `;
      }
      if (location === 'org') {
        return css`
          color: ${colors.gray100};
        `;
      }
    }}
  }
`;
