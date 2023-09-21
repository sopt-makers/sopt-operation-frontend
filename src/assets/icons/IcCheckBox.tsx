interface Props {
  isChecked?: boolean;
  onClick?: () => void;
}

function IcCheckBox(props: Props) {
  const { isChecked = false, onClick } = props;

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}>
      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="#FCFCFC" />
      <rect
        x="3.42859"
        y="3.42856"
        width="9.14286"
        height="9.14286"
        rx="4.57143"
        fill={isChecked ? '#346DFF' : ''}
      />
      <rect
        x="0.5"
        y="0.5"
        width="15"
        height="15"
        rx="7.5"
        stroke={isChecked ? '#346DFF' : '#989BA0'}
      />
    </svg>
  );
}

export default IcCheckBox;
