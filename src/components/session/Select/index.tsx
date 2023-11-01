import { useTheme } from '@emotion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import IcDropdownCheck from '@/assets/icons/IcDropdownCheck.svg';
import { ACTIVITY_GENRATION } from '@/utils/generation';
import { attendanceTranslator } from '@/utils/translator';

import { StOptions, StSelect, StSelectWrap } from './style';

interface Props {
  options: Array<{ label: string; value: ATTEND_STATUS }>;
  selected: ATTEND_STATUS;
  generation: string;
  round: '1차' | '2차';
  onChange: (value: ATTEND_STATUS) => void;
}

function Select(props: Props) {
  const { options, selected, generation, round, onChange } = props;

  const optionsRef = useRef<HTMLUListElement>(null);

  const [currentValue, setCurrentValue] = useState(selected);
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = useCallback(() => {
    setShowOptions(!showOptions);
  }, [showOptions]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        toggleOptions();
      }
    };
    const main = document.querySelector('main');
    main && main.addEventListener('click', handleClickOutside);
    return () => {
      main && document.removeEventListener('click', handleClickOutside);
    };
  }, [optionsRef, toggleOptions]);

  const onClickOption = (value: ATTEND_STATUS) => {
    onChange(value);
    setCurrentValue(value);
    toggleOptions();
  };

  return (
    <StSelectWrap>
      <StSelect onClick={toggleOptions} value={currentValue}>
        <p>
          {round} {attendanceTranslator[currentValue]}
          <IcDropdownCheck />
        </p>
      </StSelect>
      {showOptions && generation === ACTIVITY_GENRATION && (
        <StOptions ref={optionsRef}>
          {options.map((option) => (
            <li key={option.value} onClick={() => onClickOption(option.value)}>
              {option.label}
            </li>
          ))}
        </StOptions>
      )}
    </StSelectWrap>
  );
}

export default Select;
