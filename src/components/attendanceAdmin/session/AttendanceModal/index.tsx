import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';
import { startAttendance } from '@/services/api/lecture';
import { precision } from '@/utils';

import { StAttendanceModal } from './style';

interface Props {
  round: number;
  lectureId: number;
  finishAttendance: () => void;
}

const MINUTES = 10;
const SECONDS = 0;

function AttendanceModal(props: Props) {
  const { round, lectureId, finishAttendance } = props;

  const [timer, setTimer] = useState({ minutes: MINUTES, seconds: SECONDS });
  const [code, setCode] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const code = createCode();
    setCode(code);

    (async () => {
      const isStarted = await startAttendance(code, lectureId, round);
      if (!isStarted) {
        alert('출석이 정상적으로 시작되지 않았어요');
      }
    })();

    const startedAt = dayjs();

    const id = setInterval(() => {
      const now = dayjs();
      const diff = now.diff(startedAt);
      const elapsedMinutes = Math.floor(diff / (60 * 1000));
      const elapsedSeconds = Math.floor((diff % (60 * 1000)) / 1000);

      if (elapsedMinutes >= MINUTES) {
        clearInterval(id);
        setIsFinished(true);
        setTimer({ minutes: 0, seconds: 0 });
      } else {
        setTimer({
          minutes: MINUTES - elapsedMinutes - (elapsedSeconds === 0 ? 0 : 1),
          seconds: (60 - elapsedSeconds) % 60,
        });
      }
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const createCode = () => {
    const code = Math.floor(Math.random() * 99999 + 1) + '';
    const codeLength = code.length;
    return '0'.repeat(5 - codeLength) + code;
  };

  const onCloseModal = () => {
    if (isFinished) {
      finishAttendance();
    } else {
      const confirmed = confirm('출석을 조기 종료하시겠어요?');
      confirmed && finishAttendance();
    }
  };

  return (
    <StAttendanceModal>
      <ModalHeader
        title={`${round}차 출석하기`}
        desc="출석 코드 다섯 자리를 랜덤 생성합니다."
        onClose={onCloseModal}
      />
      <div>
        <p className={timer.minutes === 0 ? 'timer timer-warn' : 'timer'}>
          {precision(timer.minutes, 2)}:{precision(timer.seconds, 2)}
        </p>
        <div className="code-wrapper">
          {code.split('').map((code, index) => (
            <div key={index}>
              <p>{code}</p>
            </div>
          ))}
        </div>
      </div>
      <ModalFooter>
        <div>
          <p>출석을 정상적으로 종료하기 전에 창을 닫거나 이동하지 마세요!</p>
          <p>출석이 제대로 기록되지 않을 수 있어요.</p>
        </div>
        <Button type="submit" text="출석 종료하기" onClick={onCloseModal} />
      </ModalFooter>
    </StAttendanceModal>
  );
}

export default AttendanceModal;
