import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

import AttendanceModal from '@/components/attendanceAdmin/session/AttendanceModal';
import Button from '@/components/common/Button';
import Footer from '@/components/common/Footer';
import ListWrapper from '@/components/common/ListWrapper';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/modal';
import PartFilter from '@/components/common/PartFilter';
import Select from '@/components/session/Select';
import { attendanceInit, attendanceOptions } from '@/data/sessionData';
import {
  updateMemberAttendStatus,
  updateMemberScore,
} from '@/services/api/attendance';
import { updateAttendance } from '@/services/api/lecture';
import {
  useGetSessionDetail,
  useGetSessionMembers,
} from '@/services/api/lecture/query';
import { addPlus, precision } from '@/utils';

const HEADER_LABELS = [
  '순번',
  '회원명',
  '학교명',
  '1차 출석 상태',
  '1차 출석 일시',
  '2차 출석 상태',
  '2차 출석 일시',
  '변동점수',
  'ㅤ',
];
const TABLE_WIDTH = ['9%', '9%', '12%', '10%', '16%', '10%', '16%', '9%', '9%'];

function SessionDetailPage() {
  const router = useRouter();
  const id =
    typeof router.query.id === 'string' ? Number(router.query.id) : null;

  const [selectedPart, setSelectedPart] = useState<PART>('ALL');
  const [changedMembers, setChangedMembers] = useState<SessionMember[]>([]);
  const [modal, setModal] = useState<number | null>(null);

  const {
    data: session,
    isLoading: isLoadingSession,
    refetch: refetchSession,
    error: sessionError,
  } = useGetSessionDetail(id);
  const {
    data: members,
    isLoading: isLoadingMembers,
    refetch: refetchMembers,
    error: membersError,
  } = useGetSessionMembers(id, selectedPart);

  const onChangePart = (part: PART) => {
    setSelectedPart(part);
  };

  const onChangeStatus = async (
    status: ATTEND_STATUS,
    member: SessionMember,
    subAttendanceId: number,
  ) => {
    if (session) {
      const result = await updateMemberAttendStatus(
        subAttendanceId,
        status,
        session.attribute,
      );
      if (result) {
        alert(result.error);
      } else {
        setChangedMembers([...changedMembers, member]);
        refetchMembers();
      }
    }
  };

  const onUpdateScore = async (memberId: number) => {
    const result = await updateMemberScore(memberId);
    if (result) {
      alert(result.error);
    } else {
      setChangedMembers(
        changedMembers.filter((member) => member.member.memberId !== memberId),
      );
      refetchSession();
    }
  };

  const isChangedMember = (member: SessionMember) => {
    return changedMembers.find(
      (item) => item.member.memberId === member.member.memberId,
    );
  };

  const startAttendance = (round: number) => {
    setModal(round);
  };

  const finishAttendance = () => {
    setModal(null);
    refetchSession();
    refetchMembers();
  };

  const closeAttendance = async () => {
    const res = confirm(
      '세미나가 끝난 후에 출석을 종료할 수 있어요. 출석을 종료하시겠어요?',
    );
    if (res) {
      const result = id && (await updateAttendance(id));
      if (result) {
        refetchSession();
        refetchMembers();
        setChangedMembers([]);
        alert('출석 점수가 갱신되었어요');
      } else {
        alert('출석 점수를 갱신하는데 실패했어요');
      }
    }
  };

  if (!id || !session) return;
  if (isLoadingSession || isLoadingMembers) return <Loading />;
  return (
    <StPageWrapper>
      <StPageHeader>
        <div className="session-info">
          <h2>
            <strong>{session.name}</strong> 출석 관리
          </h2>
          <div className="attendance-info">
            <p>출석 {session.attendances.attendance}</p>
            <p>지각 {session.attendances.tardy}</p>
            <p>결석 {session.attendances.absent}</p>
            <p>미정 {session.attendances.unknown}</p>
          </div>
        </div>
        {session.part === 'ALL' && (
          <PartFilter selected={selectedPart} onChangePart={onChangePart} />
        )}
      </StPageHeader>

      {members && members.length > 0 ? (
        <ListWrapper tableWidth={TABLE_WIDTH}>
          <thead>
            <tr>
              {HEADER_LABELS.map((label) => (
                <th key={label}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => {
              const firstRound =
                member.attendances.find((item) => item.round === 1) ??
                attendanceInit;
              const secondRound =
                member.attendances.find((item) => item.round === 2) ??
                attendanceInit;
              const firstRoundTime = dayjs(firstRound.updateAt).format(
                'YYYY/MM/DD HH:mm',
              );
              const secondRoundTime = dayjs(secondRound.updateAt).format(
                'YYYY/MM/DD HH:mm',
              );
              return (
                <tr
                  key={member.member.memberId}
                  className={isChangedMember(member) ? 'focused' : ''}>
                  <td>{precision(index + 1, 2)}</td>
                  <td className="member-name">{member.member.name}</td>
                  <td className="member-university">
                    {member.member.university}
                  </td>
                  <td>
                    <Select
                      selected={firstRound.status}
                      options={attendanceOptions}
                      onChange={(value) =>
                        onChangeStatus(
                          value,
                          member,
                          firstRound.subAttendanceId,
                        )
                      }
                    />
                  </td>
                  <td className="member-date">{firstRoundTime}</td>
                  <td>
                    <Select
                      selected={secondRound.status}
                      options={attendanceOptions}
                      onChange={(value) =>
                        onChangeStatus(
                          value,
                          member,
                          secondRound.subAttendanceId,
                        )
                      }
                    />
                  </td>
                  <td className="member-date">{secondRoundTime}</td>
                  <td>{addPlus(member.updatedScore)}점</td>
                  <td className="member-update">
                    {session.status === 'END' && isChangedMember(member) && (
                      <button
                        onClick={() => onUpdateScore(member.member.memberId)}>
                        갱신
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </ListWrapper>
      ) : (
        <p className="empty">데이터가 없어요</p>
      )}

      <Footer>
        <StFooterContents>
          <div className="button-wrap">
            <Button
              type="submit"
              text="1차 출석 시작하기"
              disabled={session.status !== 'BEFORE'}
              onClick={() => startAttendance(1)}
            />
            <Button
              type="submit"
              text="2차 출석 시작하기"
              disabled={session.status !== 'FIRST'}
              onClick={() => startAttendance(2)}
            />
          </div>
          <Button
            type="submit"
            text="출석 종료하기"
            disabled={session.status !== 'SECOND'}
            onClick={closeAttendance}
          />
        </StFooterContents>
      </Footer>

      {modal && (
        <Modal>
          <AttendanceModal
            round={modal}
            lectureId={session.lectureId}
            finishAttendance={finishAttendance}
          />
        </Modal>
      )}
    </StPageWrapper>
  );
}

const StPageWrapper = styled.div`
  .member {
    &-name,
    &-university {
      max-width: 7.3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 0 auto;
      padding: 0 2.2rem;
    }
    &-university {
      max-width: 13.5rem;
    }
    &-date {
      color: ${({ theme }) => theme.color.grayscale.gray80};
    }
    &-update button {
      font-size: 1.2rem;
      font-weight: 500;
      padding: 0.6rem 1rem;
      border: 1px solid ${({ theme }) => theme.color.grayscale.gray60};
      border-radius: 16px;
      background-color: ${({ theme }) => theme.color.grayscale.gray20};
      color: ${({ theme }) => theme.color.grayscale.black40};
    }
  }
  .empty {
    text-align: center;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.color.grayscale.gray60};
    padding-top: 3rem;
  }
`;
const StPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6rem;
  h2 {
    font-size: 2rem;
    font-weight: 600;
    line-height: 2.5rem;
    height: 3rem;
    margin-bottom: 1.2rem;
    color: ${({ theme }) => theme.color.grayscale.black60};
    display: flex;
    strong {
      margin-right: 0.8rem;

      font-weight: 700;
      max-width: 18rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
    }
  }
  .attendance-info {
    display: flex;
    gap: 1rem;
    font-size: 1.4rem;
    line-height: 1.7rem;
    color: ${({ theme }) => theme.color.grayscale.gray100};
  }
`;
const StFooterContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .button-wrap {
    display: flex;
    gap: 2.4rem;
  }
`;

export default SessionDetailPage;
