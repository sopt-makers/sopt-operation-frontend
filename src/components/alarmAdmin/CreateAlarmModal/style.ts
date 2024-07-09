import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Select, TextField } from '@sopt-makers/ui';

export const StAlarmModalWrapper = styled.section`
  width: 64rem;

  & > main {
    padding: 1.6rem 3rem 3.2rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    & > .type_selector {
      display: flex;
      gap: 2rem;
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

export const StAlarmTypeButton = styled.button<{
  isSelected: boolean;
  readOnly?: boolean;
}>`
  padding: 0.8rem 2rem;

  border-radius: 11.8rem;

  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  color: ${({ isSelected }) => (isSelected ? colors.gray950 : colors.gray100)};

  background: ${({ isSelected }) => (isSelected ? colors.gray10 : 'none')};

  pointer-events: ${({ readOnly }) => (readOnly ? 'none' : 'auto')};

  &:hover {
    background: ${({ isSelected }) =>
      isSelected ? colors.gray10 : colors.gray700};
  }
  &:active {
    background: ${colors.gray600};
  }
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

  &:not(:read-only):focus {
    background-color: ${colors.gray600};
    outline: 0.1rem solid ${colors.gray300};
  }
  &:focus {
    cursor: default;
  }
`;

export const StSelect = styled(Select)`
  & > button {
    background-color: ${colors.gray700};
  }
`;

export const StTextField = styled(TextField)`
  & > label > input {
    background-color: ${colors.gray700};
  }
`;
