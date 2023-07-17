import styled from '@emotion/styled';

import { display1 } from '@/styles/fonts';

export const StWrapper = styled.div`
  padding: 0 4rem;
`;

export const StHeader = styled.header`
  & > h2 {
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 140%;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.grayscale.gray80};
  }
`;

export const StTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-top: 3.2rem;
  margin-bottom: 0.8rem;

  & > h1 {
    ${display1}
    color: ${({ theme }) => theme.color.grayscale.black40};
  }

  & > svg {
    margin-top: 1rem;

    cursor: pointer;
  }
`;
