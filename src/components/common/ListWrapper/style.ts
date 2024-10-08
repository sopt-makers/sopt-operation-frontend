import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

export const StList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 120px;

  & > li {
    border-radius: 10px;
    border: 1px solid ${colors.gray800};
    color: ${colors.gray300};

    &:not(.no-pointer):hover {
      border: 1px solid ${colors.gray600};
      background-color: ${colors.gray900};
      cursor: pointer;
    }
    &.focused {
      border: 1px solid ${colors.gray600};
      background-color: ${colors.gray900};

      &:hover {
        cursor: default;
      }
    }
  }
`;
