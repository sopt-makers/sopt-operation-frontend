import dayjs from 'dayjs';
import { useEffect } from 'react';

import { IcModalClose } from '@/assets/icons';
import AttendanceChip from '@/components/common/AttendanceChip';
import ListWrapper from '@/components/common/ListWrapper';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/modal';
import { scoreDetailAttendanceInit } from '@/data/sessionData';
import { useGetMemberAttendance } from '@/services/api/attendance/query';
import { addPlus } from '@/utils';

import { StListItem, StModalWrap, StSessionName } from './style';

interface Props {
  memberId: number;
  onClose: () => void;
}

function MemberDetail(props: Props) {
  const { memberId, onClose } = props;

  const {
    data: member,
    isLoading,
    refetch,
    error,
  } = useGetMemberAttendance(memberId);

  useEffect(() => {
    const body = document.querySelector('body');

    if (body) {
      body.style.overflow = 'hidden';
    }
    return () => {
      if (body) {
        body.style.overflow = 'scroll';
      }
    };
  }, []);

  if (error || !member) return <></>;
  if (isLoading) return <Loading />;
  return (
    <Modal>
      <StModalWrap>
        <header>
          <p className="member-name">{member.name}</p>
          <p className="member-score">{member.score}점</p>
          <p className="chip">{member.part}</p>
        </header>
        <div className="score-list">
          <ListWrapper>
            {member.lectures.map((lecture) => {
              const firstRound =
                lecture.attendances.find((item) => item.round === 1) ??
                scoreDetailAttendanceInit;
              const secondRound =
                lecture.attendances.find((item) => item.round === 2) ??
                scoreDetailAttendanceInit;
              const firstRoundDate = dayjs(firstRound.date).format(
                'YYYY/MM/DD HH:mm',
              );
              const secondRoundDate = dayjs(secondRound.date).format(
                'YYYY/MM/DD HH:mm',
              );
              return (
                <StListItem key={lecture.lecture}>
                  <div className="session-info">
                    <div className="session-score">
                      <StSessionName>{lecture.lecture}</StSessionName>
                      <AttendanceChip text={lecture.status} />
                      <AttendanceChip
                        text={`${addPlus(lecture.additiveScore)}점`}
                      />
                    </div>
                    <p className="session-date">
                      2023년 00월 00일 14:00 - 18:00
                    </p>
                  </div>
                  <div className="attendance-info">
                    <p>
                      <span
                        className={
                          firstRound.status === '결석'
                            ? 'absent attendance'
                            : 'attendance'
                        }>
                        1차 {firstRound.status}
                      </span>
                      <span>{firstRoundDate}</span>
                    </p>
                    <p>
                      <span
                        className={
                          secondRound.status === '결석'
                            ? 'absent attendance'
                            : 'attendance'
                        }>
                        2차 {secondRound.status}
                      </span>
                      <span>{secondRoundDate}</span>
                    </p>
                  </div>
                </StListItem>
              );
            })}
          </ListWrapper>
        </div>
        <button className="close-btn" onClick={() => onClose()}>
          <IcModalClose />
        </button>
      </StModalWrap>
    </Modal>
  );
}

export default MemberDetail;
