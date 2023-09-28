import { StButton } from './style';

interface Props {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

function ListActionButton(props: Props) {
  const { text, onClick, disabled = false } = props;

  return (
    <StButton
      onClick={(e) => {
        if (!disabled && onClick) {
          e.stopPropagation();
          onClick(e);
        }
      }}
      disabled={disabled}>
      {text}
    </StButton>
  );
}

export default ListActionButton;
