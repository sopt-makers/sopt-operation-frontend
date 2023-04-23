import { StAttendanceModal } from './style';

interface Props {
  modal: number;
  finishAttendance: () => void;
}

function AttendanceModal(props: Props) {
  const { modal, finishAttendance } = props;

  const createCode = () => {
    const code = Math.floor(Math.random() * 99999 + 1) + '';
    const codeLength = code.length;
    return '0'.repeat(5 - codeLength) + code;
  };

  return (
    <StAttendanceModal>
      <div>
        <div className="modal-header">
          <h3>{modal}차 출석하기</h3>
          <p>출석 코드 다섯 자리를 랜덤 생성합니다.</p>
        </div>
        <p className="timer">10:00:00</p>
        <div className="code-wrapper">
          {createCode()
            .split('')
            .map((code, index) => (
              <div key={index}>
                <p>{code}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="modal-footer">
        <div>
          <p>출석을 정상적으로 종료하기 전에 창을 닫거나 이동하지 마세요!</p>
          <p>출석이 제대로 기록되지 않을 수 있어요.</p>
        </div>
        <button onClick={finishAttendance}>출석 종료하기</button>
      </div>
    </StAttendanceModal>
  );
}

export default AttendanceModal;
