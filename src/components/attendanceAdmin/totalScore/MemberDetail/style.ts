import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const StModalWrap = styled.div`
  padding: 41px 34px 30px 34px;
  display: flex;
  align-items: flex-start;

  header {
    .member-name {
      ${fontsObject.TITLE_2_28_SB}
      color: ${colors.gray10};
    }
    .member-score {
      ${fontsObject.TITLE_2_28_SB}
      color: ${colors.orange400};
      margin-bottom: 16px;
    }
    .chip {
      ${fontsObject.BODY_3_14_M}
      color: ${colors.gray100};
      background-color: ${colors.gray700};
      padding: 5px 8px;
      border-radius: 4px;
      margin-bottom: 7px;
      width: fit-content;
    }
  }
  .score-list {
    width: 654px;
    height: 510px;
    overflow-y: scroll;
    margin: 0 27px 0 40px;

    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${colors.gray500};
      border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
  }
`;

export const StSessionName = styled.p`
  ${fontsObject.TITLE_5_18_SB}
  color: ${colors.gray10};
  max-width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 12px;
`;

export const StListItem = styled.li`
  pointer-events: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 33px;
  border: 1px solid ${colors.gray700} !important;

  .session-score {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }
  .session-date {
    ${fontsObject.BODY_3_14_M}
    color: ${colors.gray300};
  }
  .attendance-info {
    ${fontsObject.BODY_3_14_M}
    color: ${colors.gray300};
    display: flex;
    flex-direction: column;
    gap: 5px;

    .attendance {
      color: ${colors.gray100};
      margin-right: 15px;
    }
    .absent {
      color: ${colors.error};
    }
    span:not(.attendance) {
      display: inline-block;
      width: 122px;
    }
  }
`;
