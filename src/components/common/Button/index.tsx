import { StButton } from './style';

export interface Props {
  type: 'button' | 'submit';
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

function Button(props: Props) {
  const { type, text, onClick, disabled = false } = props;

  return (
    <StButton
      type={type}
      onClick={() => !disabled && onClick && onClick()}
      disabled={disabled}>
      {text}
    </StButton>
  );
}

export default Button;
