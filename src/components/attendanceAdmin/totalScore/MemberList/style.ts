import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

export const StPageHeader = styled.header`
  h1 {
    ${fonts.TITLE_32_SB}
    color: ${colors.gray10};
    margin-bottom: 41px;
  }
  p {
    ${fonts.TITLE_16_SB}
    color: ${colors.gray200};
    margin: 56px 0 18px 12px;
  }
`;

export const StListItem = styled.li`
  color: ${colors.gray100};
  display: flex;
  justify-content: space-between;
  padding: 18px 43px 18px 33px;

  .member-info-wrap {
    display: flex;

    .index {
      ${fonts.BODY_14_M}
      width: 26px;
      margin-right: 33px;
    }
    .member-info > div:first-of-type {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .member-name {
      ${fonts.TITLE_18_SB}
      color: ${colors.gray30};
      margin-bottom: 4px;
    }
    .member-university {
      ${fonts.BODY_14_M}
      color: ${colors.gray400};
    }
  }
  .member-score-wrap {
    display: flex;
    align-items: center;

    .attendance {
      ${fonts.BODY_16_M}
      color: ${colors.gray100};
      margin-right: 38px;

      span {
        color: ${colors.gray500};
        margin-right: 10px;
      }
    }
    .member-score {
      ${fonts.BODY_16_M}
      color: ${colors.gray50};
      background-color: ${colors.gray700};
      padding: 5px 13px;
      border-radius: 30px;
      width: fit-content;
      margin: 0 auto;
    }
    .minus-score {
      color: ${colors.error};
    }
  }
`;
