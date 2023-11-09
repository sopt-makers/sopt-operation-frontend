import { StChip } from './style';

interface Props {
  text: string;
}

function Chip(props: Props) {
  const { text } = props;

  return <StChip text={text}>{text}</StChip>;
}

export default Chip;
