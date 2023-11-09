import { StAttendanceChip } from './style';

interface Props {
  text: string;
}

function AttendanceChip(props: Props) {
  const { text } = props;

  return <StAttendanceChip text={text}>{text}</StAttendanceChip>;
}

export default AttendanceChip;
