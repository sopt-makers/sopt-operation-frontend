import { IcEdit, IcTrash } from '@/assets/icons';
import BannerTag from '@/components/bannerAdmin/BannerTag/BannerTag';
import { useFetchBannerList } from '@/services/api/banner/query';
import { getTagColor } from '@/utils';
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
          <StStatus status={item.status}>{item.status}</StStatus>
          <StBannerTagWrapper>
            <BannerTag color={getTagColor(item.location)}>
              <p>{item.location}</p>
            </BannerTag>
          </StBannerTagWrapper>
          <StBannerTagWrapper>
            <BannerTag color={`${colors.gray700}`}>
              {item.content_type}
            </BannerTag>
          </StBannerTagWrapper>
          <p>{item.publisher}</p>
          <p>{item.start_date}</p>
          <p>{item.end_date}</p>
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
    if (status === '진행 예정') {
      return css`
        color: ${colors.secondary};
      `;
    }
    if (status === 'in_progress') {
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

const StBannerTagWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
