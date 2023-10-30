import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

export const StAlarmModalWrapper = styled.section`
  width: 50.4rem;

  & > main {
    padding: 1.6rem 3rem 3.2rem 3rem;

    & > .type_selector {
      display: flex;
      gap: 2rem;
    }

    & > .title {
      & > div {
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
      }
    }

    & > .dropdowns {
      display: flex;
      gap: 1.6rem;
    }

    & > .inputs {
      display: flex;
      flex-direction: column;
      align-self: stretch;
    }
  }
  & > footer {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export const StAlarmTypeButton = styled.button<{ isSelected: boolean }>`
  padding: 0.8rem 2rem;

  border-radius: 11.8rem;

  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  color: ${({ isSelected }) => (isSelected ? colors.gray950 : colors.gray100)};

  background: ${({ isSelected }) => (isSelected ? colors.gray10 : 'none')};

  &:hover {
    background: ${({ isSelected }) =>
      isSelected ? colors.gray10 : colors.gray700};
  }
  &:active {
    background: ${colors.gray600};
  }
`;

export const StTargetUserSelector = styled.div<{
  defaultValue?: string;
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

  color: ${({ defaultValue }) =>
    defaultValue === '발송 파트' ? colors.gray400 : colors.gray10};

  background-color: ${colors.gray700};
  border-radius: 0.8rem;

  cursor: pointer;
`;

export const StCsvUploader = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  padding: 1rem 1.4rem;

  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.4rem; /* 150% */
  letter-spacing: -0.032rem;

  color: ${colors.gray400};
  background-color: ${colors.gray700};

  border-radius: 0.8rem;

  cursor: pointer;

  & > div.uploaded {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    color: ${colors.gray10};

    & > svg {
      &:hover {
        fill: ${colors.gray600};
      }
      &:active {
        fill: ${colors.gray500};
      }
    }
  }

  & > div.pre_upload {
    width: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    gap: 1rem;
  }
`;

export const StTextArea = styled.textarea`
  height: 12.8rem;

  padding: 1rem 1.4rem;

  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 1.8rem */
  letter-spacing: -0.018rem;

  color: ${colors.gray10};
  background-color: ${colors.gray700};
  border: none;
  outline: none;
  resize: none;

  border-radius: 0.8rem;

  &::placeholder {
    color: ${colors.gray400};
  }

  &:focus {
    background-color: ${colors.gray600};
    outline: 0.1rem solid ${colors.gray300};
  }
`;
