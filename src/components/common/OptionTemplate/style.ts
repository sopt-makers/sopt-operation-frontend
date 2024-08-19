import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const StTemplateWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  & > p {
    margin-top: 1.6rem;

    ${fontsObject.LABEL_3_14_SB}

    color: ${colors.gray300};
  }
`;
