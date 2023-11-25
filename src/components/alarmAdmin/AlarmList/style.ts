import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

export const StPageHeader = styled.div`
  h1 {
    ${fonts.TITLE_32_SB}
    color: ${colors.gray10};
    margin-bottom: 41px;
  }
  p {
    ${fonts.TITLE_16_SB}
    color: ${colors.gray200};
    margin-top: 55px;
    margin-bottom: 18px;
  }
`;

export const StListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 18px 30px 18px 33px;

  .alarm-status {
    ${fonts.BODY_14_M}
    width: 52px;
    height: 48px;
    margin-right: 34px;
  }
  .before {
    color: ${colors.error};
  }
  .after {
    color: ${colors.information};
  }
  .alarm-info-wrap {
    width: 290px;
    margin-right: 36px;

    & > div:first-of-type {
      display: flex;
      align-items: flex-start;
    }
    .alarm-title {
      ${fonts.TITLE_18_SB}
      color: ${colors.gray10};
      max-width: 146px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 15px;
      margin-bottom: 4px;
    }
    .alarm-sent-at {
      ${fonts.BODY_14_M}
      color: ${colors.gray400};
    }
  }
  .alarm-content {
    ${fonts.BODY_14_M}
    color: ${colors.gray100};
    margin-right: 64px;
    width: 331px;
    height: 48px;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .alarm-send {
    margin-right: 28px;
  }
  & > div:last-of-type {
    display: flex;
    flex-direction: column;
    position: relative;
    .delete_dropdown {
      ${fonts.BODY_14_M}

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
`;
