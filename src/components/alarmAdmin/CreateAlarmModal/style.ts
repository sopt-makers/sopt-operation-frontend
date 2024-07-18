import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { Select, TextArea, TextField } from '@sopt-makers/ui';

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

export const StTextArea = styled(TextArea)`
  & > label > input {
    background-color: ${colors.gray700};
  }
`;

export const StLabel = styled.label`
  ${fontsObject.LABEL_3_14_SB};
  color: ${colors.white};

  & > .required {
    color: ${colors.secondary};
    margin-left: 4px;
  }
`;

export const LinkChipsCss = css({
  display: 'flex',
  gap: '6px',
});
