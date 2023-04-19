import { useTheme } from '@emotion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import IcDropdown from '@/components/icons/IcDropdown';
import { attendanceTranslator } from '@/utils/translator';

import { StOptions, StSelect, StSelectWrap } from './style';

interface Props {
  options: Array<{ label: string; value: ATTEND_STATUS }>;
  selected: ATTEND_STATUS;
  onChange: (value: ATTEND_STATUS) => void;
}

function Select(props: Props) {
  const { options, selected, onChange } = props;

  const theme = useTheme();

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

  const getColor = (selected: ATTEND_STATUS) => {
    switch (selected) {
      case 'ABSENT':
        return theme.color.sub.red;
      case 'TARDY':
        return theme.color.sub.yellow;
      case 'ATTENDANCE':
        return theme.color.sub.green;
      default:
        return theme.color.grayscale.black40;
    }
  };

  const onClickOption = (value: ATTEND_STATUS) => {
    onChange(value);
    toggleOptions();
  };

  return (
    <StSelectWrap>
      <StSelect onClick={toggleOptions}>
        <p style={{ color: getColor(selected) }}>
          {attendanceTranslator[selected]}
        </p>
        <IcDropdown />
      </StSelect>
      {showOptions && (
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
