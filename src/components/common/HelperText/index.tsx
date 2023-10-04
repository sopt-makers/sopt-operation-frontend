import { StContent, StTextBox } from './style';

interface Props {
  text: string;
  StWrapper: typeof StTextBox;
}

function HelperText(props: Props) {
  const { text, StWrapper } = props;

  return (
    <StWrapper>
      <StContent>
        <StTextBox>
          <p>{text}</p>
        </StTextBox>

        <div className="triangle"></div>
      </StContent>
    </StWrapper>
  );
}

export default HelperText;
