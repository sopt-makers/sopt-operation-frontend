import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

export const StSelectorWrapper = styled.div<{
  selectedValue?: string | null;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;

  min-width: 8.6rem;

  padding: 1rem 1.4rem;

  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 1.8rem */
  letter-spacing: -0.018rem;

  color: ${({ selectedValue }) =>
    selectedValue === '발송 파트' ? colors.gray400 : colors.gray10};

  background-color: ${colors.gray700};
  border-radius: 0.8rem;

  cursor: pointer;
`;
