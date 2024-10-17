import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { IconArrowUpRight } from '@sopt-makers/icons';

export const StAlarmModalWrapper = styled.section`
  width: 64rem;

  & > main {
    padding: 2.6rem 3rem;

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

export const SelectWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  margin-top: 1.6rem;
`;

export const SendTimeWrapper = styled.div`
  display: flex;
  gap: 2rem;

  margin-top: 1.6rem;

  & .react-datepicker-wrapper {
    height: 0;
  }

  & .react-datepicker__navigation {
    width: 3.2rem;
  }
`;

export const AttachWrapper = styled.div`
  width: 100%;
  margin-top: 1.6rem;
`;

export const AvailableCheckLink = styled.a`
  display: flex;
  width: max-content;
  align-items: center;

  margin-top: 0.2rem;

  border-bottom: 1px solid ${colors.gray100};
  cursor: pointer;
  color: ${colors.gray100};
`;

export const StyledIconArrowUpRight = styled(IconArrowUpRight)`
  width: 1.6rem;
`;

export const AvailableCheckText = styled.span`
  ${fontsObject.LABEL_5_11_SB}
`;

export const AttachOptionButtonList = styled.ul`
  display: flex;
  gap: 0.6rem;

  margin-top: 0.8rem;
`;

export const OptionalInputWrapper = styled.div<{ attachOption: string }>`
  width: 100%;
  margin-top: ${({ attachOption }) => attachOption !== '첨부 안함' && `0.8rem`};
`;

export const triggerCSS = css`
  background-color: ${colors.gray700};
  width: 18rem;
`;

export const inputCSS = css`
  & input {
    background-color: ${colors.gray700};
    width: 100%;
  }
`;

export const textAreaCSS = css`
  margin-top: 0.8rem;
  & div {
    background-color: ${colors.gray700};
    width: 100%;
    & textarea {
      background-color: ${colors.gray700};
    }
  }
`;

export const sendSelectCSS = css`
  width: 18rem;
  margin-top: 0.8rem;
  & button {
    width: 100%;
  }
  & ul {
    background-color: ${colors.gray600};
    width: 100%;
    & button {
      width: 100%;
    }
    & button:hover {
      background-color: ${colors.gray500};
    }
  }
`;

export const sendTriggerCSS = css`
  background-color: ${colors.gray700};
  width: 100%;
`;

export const reserveDateSelectCSS = css`
  width: 28rem;
  & button {
    width: 100%;
  }
  & ul {
    background-color: ${colors.gray600};
    width: 100%;
    & button {
      width: 100%;
    }
    & button:hover {
      background-color: ${colors.gray500};
    }
  }
  & svg {
  }
`;

export const datePickerWrapperCSS = css`
  position: relative;
  display: inline-block;

  width: 28rem;
  height: 4.8rem;
`;

export const reserveTimeSelectCSS = (isBannedTime: boolean) => css`
  width: 28rem;
  & button {
    width: 100%;
    & > div:not(ul div) {
      border: ${isBannedTime && `1px solid ${colors.error}`};
    }
  }
  & ul {
    background-color: ${colors.gray600};
    width: 100%;
    & button {
      width: 100%;
    }
    & button:hover {
      background-color: ${colors.gray500};
    }
  }
`;

export const reserveTimeTriggerCSS = (isBannedTime: boolean) => css`
  background-color: ${colors.gray700};
  width: 100%;
  & p {
    color: ${isBannedTime && colors.error};
  }
`;

export const reserveDateTriggerCSS = (selectedDate: Date | null) => css`
  background-color: ${colors.gray700};
  width: 100%;
  & p {
    color: ${selectedDate ? colors.white : colors.gray300};
  }
`;

export const deepLinkSelectCSS = css`
  width: 100%;
  & button {
    width: 100%;
  }
  & ul {
    background-color: ${colors.gray600};
    width: 100%;
    & button:hover {
      background-color: ${colors.gray500};
    }
  }
`;

export const deepLinkTriggerCSS = css`
  background-color: ${colors.gray700};
  width: 100%;
`;
