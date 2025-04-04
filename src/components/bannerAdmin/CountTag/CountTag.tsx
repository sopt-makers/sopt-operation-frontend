import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

interface CountTagProps {
  status: BANNER_STATUS;
  children: string | number;
}

const CountTag = ({ status, children }: CountTagProps) => {
  return <TagWrapper status={status}>{children}</TagWrapper>;
};

export default CountTag;

const TagWrapper = styled.div<{ status: BANNER_STATUS }>`
  padding: 0.3rem 0.9rem;

  border-radius: 100px;

  ${fontsObject.LABEL_3_14_SB};

  ${({ status }) => {
    if (status === 'ALL' || status === 'DONE') {
      return css`
        color: ${colors.gray10};
        background-color: ${colors.gray700};
      `;
    }
    if (status === 'RESERVED') {
      return css`
        color: ${colors.secondary};
        background-color: ${colors.orangeAlpha200};
      `;
    }
    if (status === 'IN_PROGRESS') {
      return css`
        color: ${colors.success};
        background-color: ${colors.blueAlpha200};
      `;
    }
  }}
`;
