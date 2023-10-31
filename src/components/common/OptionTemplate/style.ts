import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

export const StTemplateWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  & > p {
    margin-top: 1.6rem;

    font-size: 1.4rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2rem; /* 142.857% */
    letter-spacing: -0.028rem;

    color: ${colors.gray300};
  }
`;
