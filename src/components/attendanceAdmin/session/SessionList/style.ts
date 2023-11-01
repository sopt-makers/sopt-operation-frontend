import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

export const StListHeader = styled.header`
  & > h1 {
    ${fonts.TITLE_32_SB}
    color: ${colors.gray10};
    margin-bottom: 41px;
  }
  & > p {
    ${fonts.TITLE_16_SB}
    color: ${colors.gray200};
    margin-top: 55px;
    margin-bottom: 18px;
  }
`;

export const StListItem = styled.li`
  padding: 18px 22px 18px 32px;
  display: flex;
  justify-content: space-between;

  .left-top {
    display: flex;
    align-items: center;
    margin-bottom: 7px;

    & > p:first-of-type {
      ${fonts.TITLE_20_SB}
      color: ${colors.gray10};
      margin-right: 15px;
    }
  }
  .left-bottom {
    display: flex;
    align-items: center;
    gap: 14px;

    p {
      ${fonts.LABEL_12_SB}
      color: ${colors.gray500};

      span {
        ${fonts.BODY_14_M}
        color: ${colors.gray300};
        margin-left: 6px;
      }
    }
  }
  .right {
    ${fonts.BODY_14_M}
    display: flex;
    align-items: center;
    gap: 55px;

    & > div:first-of-type {
      display: flex;
      flex-direction: column;
      gap: 4px;

      p {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }
`;

export const IndicatorStructure = styled.span`
  ${fonts.LABEL_12_SB}
  display: inline-block;
  border: 1px solid ${colors.gray500};
  border-radius: 20px;
  padding: 3.5px 8px;
  margin-right: 10px;
`;

export const StPartIndicator = styled(IndicatorStructure)`
  color: ${colors.gray200};
`;

export const StSessionIndicator = styled(IndicatorStructure)<{
  attributeName: string;
}>`
  ${({ attributeName }) =>
    attributeName === '세미나'
      ? css`
          border-color: ${colors.orange600};
          color: ${colors.orange600};
        `
      : attributeName === '행사'
      ? css`
          border-color: ${colors.blue400};
          color: ${colors.blue400};
        `
      : css`
          border-color: ${colors.yellow700};
          color: ${colors.yellow700};
        `}
`;

export const StSessionName = styled.p`
  max-width: 17rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;
`;

export const StActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;

  &:hover {
    background-color: ${colors.gray600};
  }
`;
