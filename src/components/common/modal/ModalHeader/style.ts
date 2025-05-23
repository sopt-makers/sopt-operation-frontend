import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const StModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 2.2rem 2.8rem 2.2rem 3.2rem;

  & > div.title {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;

    & > h1 {
      ${fontsObject.HEADING_3_28_B};
      color: ${colors.gray10};
    }

    & > h2 {
      font-size: 1.4rem;
      font-style: normal;
      font-weight: 300;
      line-height: 160%;
      letter-spacing: -0.021rem;

      color: ${colors.gray300};
    }
  }
  & > svg {
    cursor: pointer;

    &:hover {
      fill: ${colors.gray700};
    }
    &:active {
      fill: ${colors.gray600};
    }
  }
`;
