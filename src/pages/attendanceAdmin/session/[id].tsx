import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import AttendanceModal from '@/components/attendanceAdmin/session/AttendanceModal';
import Button from '@/components/common/Button';
import Footer from '@/components/common/Footer';
import ListWrapper from '@/components/common/ListWrapper';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/modal';
import PartFilter from '@/components/common/PartFilter';
import Select from '@/components/session/Select';
import {
  attendanceInit,
  eventAttendanceOptions,
  seminarAttendanceOptions,
  subLectureInit,
} from '@/data/sessionData';
import {
  updateMemberAttendStatus,
  updateMemberScore,
} from '@/services/api/attendance';
import { getSessionDetail, getSessionMembers } from '@/services/api/lecture';
import { addPlus, precision } from '@/utils';
import { getAuthHeader } from '@/utils/auth';

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
  const [session, setSession] = useState<SessionDetail>();
  const [members, setMembers] = useState<Member[]>([]);
  const [changedMembers, setChangedMembers] = useState<Member[]>([]);
  const [modal, setModal] = useState<number | null>(null);

  const getSessionData = useCallback(async () => {
    if (id) {
      const result = await getSessionDetail(id, getAuthHeader());
      if ('error' in result) {
        alert(result.error);
      } else {
        setSession(result);
      }
    }
  }, [id]);

  const getSessionMemberData = useCallback(
    async (part?: PART) => {
      if (id) {
        const result = await getSessionMembers(id, getAuthHeader(), part);
        if ('error' in result) {
          alert(result.error);
        } else {
          setMembers(result);
        }
      }
    },
    [id],
  );

  const firstSession = useMemo(
    () =>
      session
        ? session.subLectures.find((subLecture) => subLecture.round === 1) ??
          subLectureInit
        : subLectureInit,
    [session],
  );
  const secondSession = useMemo(
    () =>
      session
        ? session.subLectures.find((subLecture) => subLecture.round === 2) ??
          subLectureInit
        : subLectureInit,
    [session],
  );

  useEffect(() => {
    if (!router.isReady) return;

    getSessionData();
    getSessionMemberData();
  }, [getSessionData, getSessionMemberData, router.isReady]);

  const onChangePart = (part: PART) => {
    setSelectedPart(part);
    getSessionMemberData(part);
  };

  const onChangeStatus = async (
    status: ATTEND_STATUS,
    member: Member,
    subAttendanceId: number,
  ) => {
    if (session) {
      const result = await updateMemberAttendStatus(
        subAttendanceId,
        status,
        session.attribute,
        getAuthHeader(),
      );
      if (result) {
        alert(result.error);
      } else {
        setChangedMembers([...changedMembers, member]);
        session.part === 'ALL'
          ? await getSessionMemberData()
          : await getSessionMemberData(selectedPart);
      }
    }
  };

  const onUpdateScore = async (memberId: number) => {
    const result = await updateMemberScore(memberId, getAuthHeader());
    if (result) {
      alert(result.error);
    } else {
      setChangedMembers(
        changedMembers.filter((member) => member.member.memberId !== memberId),
      );
      await getSessionData();
    }
  };

  const isChangedMember = (member: Member) => {
    return changedMembers.find(
      (item) => item.member.memberId === member.member.memberId,
    );
  };

  const startAttendance = (round: number) => {
    setModal(round);
  };

  const finishAttendance = () => {
    setModal(null);
  };

  if (!id) return;
  if (!session) return <Loading />;
  return (
    <StPageWrapper>
      <StPageHeader>
        <div className="session-info">
          <h2>
            <strong>{session.name}</strong> 출석 관리
          </h2>
          <div className="attendance-info">
            <p>출석 {session.result.attendance}</p>
            <p>지각 {session.result.tardy}</p>
            <p>결석 {session.result.absent}</p>
            <p>미정 {session.result.unknown}</p>
          </div>
        </div>
        {session.part === 'ALL' && (
          <PartFilter selected={selectedPart} onChangePart={onChangePart} />
        )}
      </StPageHeader>

      {members.length > 0 ? (
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
                      options={
                        session.attribute === 'SEMINAR'
                          ? seminarAttendanceOptions
                          : eventAttendanceOptions
                      }
                      onChange={(value) =>
                        onChangeStatus(
                          value,
                          member,
                          firstRound.subAttendanceId,
                        )
                      }
                    />
                  </td>
                  <td className="member-date">{firstRound.updateAt}</td>
                  <td>
                    <Select
                      selected={secondRound.status}
                      options={
                        session.attribute === 'SEMINAR'
                          ? seminarAttendanceOptions
                          : eventAttendanceOptions
                      }
                      onChange={(value) =>
                        onChangeStatus(
                          value,
                          member,
                          secondRound.subAttendanceId,
                        )
                      }
                    />
                  </td>
                  <td className="member-date">{secondRound.updateAt}</td>
                  <td>{addPlus(member.updatedScore)}점</td>
                  <td className="member-update">
                    {isChangedMember(member) && (
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
              disabled={!!firstSession.startAt}
              onClick={() => startAttendance(1)}
            />
            <Button
              type="submit"
              text="2차 출석 시작하기"
              disabled={!firstSession.startAt || !!secondSession.startAt}
              onClick={() => startAttendance(2)}
            />
          </div>
        </StFooterContents>
      </Footer>

      {modal && (
        <Modal>
          <AttendanceModal modal={modal} finishAttendance={finishAttendance} />
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
      max-width: 7.6rem;
    }
    &-date {
      color: ${({ theme }) => theme.color.grayscale.gray80};
    }
    &-update button {
      font-size: 1.2rem;
      font-weight: 500;
      padding: 0.6rem 1rem;
      border: 1px solid ${({ theme }) => theme.color.main.purple40};
      border-radius: 16px;
      background-color: rgba(198, 169, 255, 0.2);
      color: ${({ theme }) => theme.color.main.purple100};
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
    margin-bottom: 1.2rem;
    color: ${({ theme }) => theme.color.grayscale.black60};
    strong {
      font-weight: 700;
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
