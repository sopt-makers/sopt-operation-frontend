import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

export const StList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    border-radius: 10px;
    border: 1px solid ${colors.gray800};
    color: ${colors.gray300};

    &:hover {
      border: 1px solid ${colors.gray600};
      background-color: ${colors.gray900};
      cursor: pointer;
    }
  }
`;
