import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import Loading from '@/components/common/Loading';
import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';
import { startAttendance } from '@/services/api/lecture';
import { precision } from '@/utils';

import { StAttendanceModal } from './style';

type Status = 'LOADING' | 'STARTED' | 'FINISHED';
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
  const [status, setStatus] = useState<Status>('LOADING');

  useEffect(() => {
    const createCode = () => {
      const randomNum = Math.floor(Math.random() * 99999 + 1) + '';
      return '0'.repeat(5 - randomNum.length) + randomNum;
    };
    const code = createCode();
    setCode(code);

    const start = async () => {
      const isStarted = await startAttendance(code, lectureId, round);
      if (isStarted) {
        setStatus('STARTED');
      } else {
        const isRetry = confirm(
          '출석이 정상적으로 시작되지 않았어요. 다시 시도하시겠어요?',
        );
        if (isRetry) {
          start();
        } else {
          finishAttendance();
        }
      }
    };
    start();
  }, [lectureId, round, finishAttendance]);

  useEffect(() => {
    if (status !== 'STARTED') return;

    const startedAt = dayjs();

    const id = setInterval(() => {
      const now = dayjs();
      const diff = now.diff(startedAt);
      const elapsedMinutes = Math.floor(diff / (60 * 1000));
      const elapsedSeconds = Math.floor((diff % (60 * 1000)) / 1000);

      if (elapsedMinutes >= MINUTES) {
        clearInterval(id);
        setStatus('FINISHED');
        setTimer({ minutes: 0, seconds: 0 });
      } else {
        setTimer({
          minutes: MINUTES - elapsedMinutes - (elapsedSeconds === 0 ? 0 : 1),
          seconds: (60 - elapsedSeconds) % 60,
        });
      }
    }, 1000);

    return () => clearInterval(id);
  }, [status]);

  const handleCloseModal = () => {
    if (status === 'FINISHED') {
      finishAttendance();
    } else {
      const confirmed = confirm('출석을 조기 종료하시겠어요?');
      confirmed && finishAttendance();
    }
  };

  if (status === 'LOADING') return <Loading full />;
  return (
    <StAttendanceModal>
      <ModalHeader
        title={`${round}차 출석하기`}
        desc="출석 코드 다섯 자리를 랜덤 생성합니다."
        onClose={handleCloseModal}
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
        <Button type="submit" text="출석 종료하기" onClick={handleCloseModal} />
      </ModalFooter>
    </StAttendanceModal>
  );
}

export default AttendanceModal;
