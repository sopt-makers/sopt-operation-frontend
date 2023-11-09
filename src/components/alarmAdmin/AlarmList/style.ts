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
`;
