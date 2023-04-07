import { useCallback, useEffect, useRef, useState } from 'react';

import IcDropdown from '@/components/icons/IcDropdown';
import { attendanceTranslator } from '@/utils/translator';

import { StOptions, StSelect, StSelectWrap } from './style';

interface Props {
  options: Array<{ label: string; value: ATTEND_STATUS }>;
  selected: ATTEND_STATUS;
  onChange: (value: string) => void;
}

function Select(props: Props) {
  const { options, selected, onChange } = props;

  const optionsRef = useRef<HTMLUListElement>(null);

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

  return (
    <StSelectWrap>
      <StSelect onClick={toggleOptions}>
        <p>{attendanceTranslator[selected]}</p>
        <IcDropdown />
      </StSelect>
      {showOptions && (
        <StOptions ref={optionsRef}>
          {options.map((option) => (
            <li key={option.value} onClick={() => onChange(option.value)}>
              {option.label}
            </li>
          ))}
        </StOptions>
      )}
    </StSelectWrap>
  );
}

export default Select;
