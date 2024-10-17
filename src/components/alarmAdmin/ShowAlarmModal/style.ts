import theme from '@/styles/theme';
import styled from '@emotion/styled';
import { fontsObject } from '@sopt-makers/fonts';

export const StModalBody = styled.main`
  & > div {
    display: flex;
    gap: 20px;
  }
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StTextField = styled.div<{ full?: boolean; textarea?: boolean }>`
  width: ${({ full }) => (full ? '100%' : 'auto')};

  label {
    ${fontsObject.LABEL_3_14_SB};
    color: ${theme.color.grayscale.realwhite};
    margin-bottom: 8px;
    display: block;
  }
  p {
    ${fontsObject.BODY_2_16_M};
    color: ${theme.color.grayscale.realwhite};
    background-color: #2e2e35;
    padding: 11px 16px;
    border-radius: 10px;
    min-width: 180px;
    line-height: 26px;
    min-height: ${({ textarea }) => (textarea ? '128px' : '48px')};
  }
`;
