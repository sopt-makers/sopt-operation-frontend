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

export const textAreaCss = css({
  ...fontsObject.TITLE_6_16_SB,
  background: colors.gray700,
  border: '1px solid transparent',
  borderRadius: '10px',
  width: '100%',
  height: '128px',
  padding: '10px 16px',
  color: colors.white,
  boxSizing: 'border-box',

  '::placeholder': {
    color: colors.gray300,
  },
  ':focus': {
    border: `1px solid ${colors.gray200}`,
    outline: 'none',
  },
  ':disabled': {
    color: colors.gray500,
  },
  ':read-only': {
    cursor: 'default',
  },
  resize: 'none',
});

export const fileUploaderCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '48px',
  padding: '10px 16px',
  ...fontsObject.TITLE_6_16_SB,
  color: colors.gray300,
  background: colors.gray700,
  borderRadius: '10px',
  cursor: 'pointer',
});

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
