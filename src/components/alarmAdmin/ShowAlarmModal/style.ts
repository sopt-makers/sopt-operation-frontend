import styled from '@emotion/styled';
import { fontsObject } from '@sopt-makers/fonts';
import { colors } from '@sopt-makers/colors';
import { css } from '@emotion/react';

export const StAlarmModalWrapper = styled.section`
  width: 64rem;
`;

export const StAlarmModalBody = styled.main`
  padding: 2.6rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  & > div {
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }
  label {
    ${fontsObject.LABEL_3_14_SB};
    color: ${colors.white};
    margin-bottom: 8px;
    display: block;
  }
`;

export const StAlarmModalFooter = styled.footer`
  padding: 2.5rem 3.2rem;
  display: flex;
  justify-content: flex-end;
  margin-top: 1.8rem;
`;

export const StTextField = styled.div<{ full?: boolean; textarea?: boolean }>`
  width: ${({ full }) => (full ? '100%' : 'auto')};

  p {
    ${fontsObject.BODY_2_16_M};
    color: ${colors.white};
    background-color: #2e2e35;
    padding: 11px 16px;
    border-radius: 10px;
    min-width: 180px;
    line-height: 26px;
    min-height: ${({ textarea }) => (textarea ? '128px' : '48px')};
  }
`;

export const StRadioWrap = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

export const StLink = styled.a<{ linkType: LINK_TYPE }>`
  ${fontsObject.LABEL_3_14_SB};
  color: ${colors.gray200};
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  pointer-events: none;

  ${({ linkType }) =>
    linkType === 'WEB' &&
    css`
      cursor: pointer;
      text-decoration: underline;
      pointer-events: visible;
    `}
`;
