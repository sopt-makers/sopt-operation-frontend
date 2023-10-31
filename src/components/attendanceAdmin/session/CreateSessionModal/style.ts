import styled from '@emotion/styled';

export const StPartSelector = styled.div`
  position: relative;
  width: 100%;

  font-weight: 600;
  font-size: 2rem;
  line-height: 140%;
  letter-spacing: -0.02em;

  & > svg {
    cursor: pointer;
  }
`;

export const StSelectedPart = styled.span<{ textColor: string }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.4rem;

  cursor: pointer;
  color: ${({ textColor }) => textColor};
`;

export const StDatePickerInput = styled.div<{ hasValue?: boolean }>`
  width: 100%;
  height: auto;

  & > div.react-datepicker-wrapper {
    width: 100%;
    height: auto;

    & > div {
      width: 100%;
      height: auto;

      & > input {
        width: 100%;
        height: auto;

        padding: 1rem 1.4rem;

        color: ${({ theme }) => theme.color.grayscale.black40};
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2.4rem;
        letter-spacing: -0.02em;

        outline: ${({ hasValue, theme }) =>
          hasValue
            ? `1px solid ${theme.color.grayscale.black40}`
            : `1px solid ${theme.color.grayscale.gray30}`};
        border: none;
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 8px;

        &::placeholder {
          color: ${({ theme }) => theme.color.grayscale.gray30};

          font-weight: 500;
          font-size: 1.6rem;
          line-height: 2.4rem;
          letter-spacing: -0.02em;
        }
        &:focus {
          outline: ${({ theme }) => theme.color.grayscale.black40} solid 1px;
        }
      }
    }
  }

  & > div.react-datepicker__tab-loop {
    width: auto;
  }
`;
