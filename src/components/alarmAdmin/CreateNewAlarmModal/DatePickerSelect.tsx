import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { IconChevronDown } from '@sopt-makers/icons';
import React from 'react';

interface DatePickerSelectProps {
  selectedDate: string | null;
  placeholder: string;
  open: boolean;
}

function DatePickerSelect({
  selectedDate,
  placeholder,
  open,
}: DatePickerSelectProps) {
  const selectedLabel = selectedDate ? selectedDate : placeholder;

  return (
    <DatePickerSelectButton>
      <DatePickerSelectWrapper>
        <DatePickerSelectLabel isSelected={selectedDate !== null}>
          {selectedLabel}
        </DatePickerSelectLabel>
        <IconChevronDown
          style={{
            width: 20,
            height: 20,
            transform: open ? 'rotate(-180deg)' : '',
            transition: 'all 0.3s ease',
          }}
        />
      </DatePickerSelectWrapper>
    </DatePickerSelectButton>
  );
}

export default DatePickerSelect;

const DatePickerSelectButton = styled.button`
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

const DatePickerSelectWrapper = styled.div`
  width: 100%;
  height: 100%;

  ${fontsObject.BODY_2_16_M};
  color: ${colors.white};

  border-radius: 10px;

  border: 1px solid transparent;
  padding: 11px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: border 0.2s;

  background-color: ${colors.gray700};

  &:focus {
    border: 1px solid ${colors.gray200};
  }
`;

const DatePickerSelectLabel = styled.p<{ isSelected: boolean }>`
  color: ${({ isSelected }) => !isSelected && colors.gray300};
`;
