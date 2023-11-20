import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

export const StListHeader = styled.header`
  h1 {
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
    align-items: flex-start;
    gap: 55px;

    & > div:first-of-type {
      display: flex;
      flex-direction: column;
      gap: 4px;

      width: 22rem;

      p {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }

    & > div:last-of-type {
      display: flex;
      flex-direction: column;
      position: relative;

      & > div.delete_dropdown {
        position: absolute;
        top: 100%;
        right: 0.001%; // 요소의 왼쪽 경계를 부모의 중앙에 위치시킵니다.

        display: flex;
        justify-content: flex-start;
        align-items: center;

        width: 9.3rem;

        margin-top: 1rem;
        padding: 0.8rem 0.7rem;

        background-color: ${colors.gray700};
        border-radius: 1rem;

        animation: appearDropdown 0.6s;

        & > p {
          width: 100%;
          height: 100%;

          padding: 0.5rem 0.9rem;

          color: ${colors.error};

          border-radius: 0.6rem;

          &:hover {
            background-color: ${colors.gray600};
          }
        }

        @keyframes appearDropdown {
          from {
            opacity: 0;
            transform: translateY(-1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0rem);
          }
        }
      }
    }
  }
`;

export const StSessionName = styled.p`
  max-width: 17rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;
`;

export const StActionButton = styled.button`
  position: relative;

  width: 32px;
  height: 32px;
  border-radius: 8px;

  &:hover {
    background-color: ${colors.gray600};
  }
`;
