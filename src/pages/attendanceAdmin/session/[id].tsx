import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { ReactNode, RefObject, useRef, useState } from 'react';

import AttendanceModal from '@/components/attendanceAdmin/session/AttendanceModal';
import Button from '@/components/common/Button';
import Chip from '@/components/common/Chip';
import FloatingButton from '@/components/common/FloatingButton';
import Footer from '@/components/common/Footer';
import HelperText from '@/components/common/HelperText';
import ListActionButton from '@/components/common/ListActionButton';
import ListWrapper from '@/components/common/ListWrapper';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/modal';
import PartFilter from '@/components/common/PartFilter';
import Select from '@/components/session/Select';
import { PAGE_SIZE } from '@/data/queryData';
import { attendanceInit, attendanceOptions } from '@/data/sessionData';
import useObserver from '@/hooks/useObserver';
import {
  updateMemberAttendStatus,
  updateMemberScore,
} from '@/services/api/attendance';
import { updateAttendance } from '@/services/api/lecture';
import {
  useGetInfiniteSessionMembers,
  useGetSessionDetail,
} from '@/services/api/lecture/query';
import { addPlus, precision } from '@/utils';
import { ACTIVITY_GENRATION } from '@/utils/generation';
import { attributeTranslator, partTranslator } from '@/utils/translator';

function SessionDetailPage() {
  const router = useRouter();
  const id =
    typeof router.query.id === 'string' ? Number(router.query.id) : null;

  const [selectedPart, setSelectedPart] = useState<PART>('ALL');
  const [changedMembers, setChangedMembers] = useState<SessionMember[]>([]);
  const [modal, setModal] = useState<number | null>(null);
  const bottomRef: RefObject<HTMLDivElement> = useRef(null);

  const {
    data: session,
    isLoading: isLoadingSession,
    refetch: refetchSession,
    error: sessionError,
  } = useGetSessionDetail(id);

  const {
    data: members,
    fetchNextPage,
    isFetchingNextPage,
    status,
    refetch: refetchMembers,
  } = useGetInfiniteSessionMembers(id, selectedPart);

  useObserver({
    target: bottomRef,
    fetchNextPage,
  });

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
        // refetchMembers();
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

  const getMemberCount = (attendances: Record<string, number>) => {
    let sum = 0;
    Object.keys(attendances).map((key) => (sum += attendances[key]));
    return sum;
  };

  const getButtonContent = (status: SESSION_STATUS): ReactNode => {
    switch (status) {
      case 'BEFORE':
        return <>1차 출석 시작하기</>;
      case 'FIRST':
        return <>2차 출석 시작하기</>;
      case 'SECOND':
        return <>출석 완료하기</>;
      default:
        return <></>;
    }
  };

  const getButtonClickHandler = (status: SESSION_STATUS) => {
    switch (status) {
      case 'BEFORE':
        return () => startAttendance(1);
      case 'FIRST':
        return () => startAttendance(2);
      case 'SECOND':
        return () => closeAttendance();
      default:
        // eslint-disable-next-line prettier/prettier
        return () => { };
    }
  };

  return (
    <StPageWrapper>
      {session && (
        <StPageHeader>
          <div className="title">
            <h1>{session.name} 출석 관리</h1>
            <Chip text={partTranslator[session.part]} />
            <Chip text={attributeTranslator[session.attribute]} />
          </div>
          {session.part === 'ALL' && (
            <PartFilter selected={selectedPart} onChangePart={onChangePart} />
          )}
          <div className="attendances">
            <p>총 {getMemberCount(session.attendances)}명</p>
            <div>
              <p>출석 {session.attendances.attendance}</p>
              <p>지각 {session.attendances.tardy}</p>
              <p>결석 {session.attendances.absent}</p>
              <p>미정 {session.attendances.unknown}</p>
            </div>
          </div>
        </StPageHeader>
      )}

      {session && members ? (
        <ListWrapper>
          {members?.pages.map(
            (pageMembers, pageIndex) =>
              pageMembers &&
              pageMembers.map((member, index) => {
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
                  <StListItem
                    key={member.member.memberId}
                    className={isChangedMember(member) ? 'focused' : ''}>
                    <p className="member-index">
                      {precision(pageIndex * PAGE_SIZE + index + 1, 2)}
                    </p>
                    <div className="member-info">
                      <div>
                        <p className="member-name">{member.member.name}</p>
                        <Chip text="파트" />
                      </div>
                      <p className="member-university">
                        {member.member.university}
                      </p>
                    </div>
                    <Select
                      selected={firstRound.status}
                      options={attendanceOptions.first}
                      round="1차"
                      onChange={(value) =>
                        onChangeStatus(
                          value,
                          member,
                          firstRound.subAttendanceId,
                        )
                      }
                      generation={String(session.generation)}
                    />
                    <p className="member-date">{firstRoundTime}</p>
                    <Select
                      selected={secondRound.status}
                      options={attendanceOptions.second}
                      round="2차"
                      onChange={(value) =>
                        onChangeStatus(
                          value,
                          member,
                          secondRound.subAttendanceId,
                        )
                      }
                      generation={String(session.generation)}
                    />
                    <p className="member-date">{secondRoundTime}</p>
                    <div className="member-score-wrap">
                      <p
                        className={
                          member.updatedScore < 0
                            ? 'member-score minus-score'
                            : 'member-score'
                        }>
                        {addPlus(member.updatedScore)}점
                      </p>
                    </div>
                    <ListActionButton
                      onClick={() => onUpdateScore(member.member.memberId)}
                      text="갱신"
                      disabled={
                        !(
                          session.status === 'END' &&
                          isChangedMember(member) &&
                          String(session.generation) === ACTIVITY_GENRATION
                        )
                      }
                    />
                  </StListItem>
                );
              }),
          )}
        </ListWrapper>
      ) : (
        <p className="empty">데이터가 없어요</p>
      )}

      <div ref={bottomRef} />
      {isFetchingNextPage && <Loading dimmed={false} full={false} />}

      {session && session.status !== 'END' && (
        <>
          {session.status == 'SECOND' && (
            <HelperText
              text={
                '추후에 출석 상태를 개별로 변경하실 수 있어요.\n출석이 대부분 진행되었다면 완료하세요!'
              }
              StWrapper={StHelperTextWrapper}
            />
          )}
          <FloatingButton
            content={getButtonContent(session.status)}
            onClick={getButtonClickHandler(session.status)}
          />
        </>
      )}

      {session && modal && (
        <Modal>
          <AttendanceModal
            round={modal}
            lectureId={session.lectureId}
            finishAttendance={finishAttendance}
          />
        </Modal>
      )}

      {(isLoadingSession || status === 'loading') && <Loading />}
    </StPageWrapper>
  );
}

const StPageWrapper = styled.div`
  .empty {
    text-align: center;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.color.grayscale.gray60};
    padding-top: 3rem;
  }
`;
const StPageHeader = styled.div`
  h1 {
    ${fonts.TITLE_32_SB}
    color: ${colors.gray10};
    margin-right: 20px;
  }
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 41px;
  }
  .attendances {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 56px;
    margin-bottom: 18px;

    & > p {
      ${fonts.TITLE_16_SB}
      color: ${colors.gray200};
    }
    & > div {
      ${fonts.TITLE_14_SB}
      color: ${colors.gray400};
      display: flex;
      gap: 11px;
    }
  }
`;
const StListItem = styled.li`
  padding: 18px 34px;
  display: flex;
  align-items: center;
  pointer-events: none;
  color: ${colors.gray100};

  .member-index {
    ${fonts.BODY_14_M}
    width: 26px;
    margin-right: 33px;
  }
  .member-info {
    margin-right: 26px;
  }
  .member-info > div:first-of-type {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    width: 144px;
  }
  .member-name {
    ${fonts.TITLE_18_SB}
    color: ${colors.gray30};
    margin-right: 15px;
    max-width: 80px;
  }
  .member-university {
    ${fonts.BODY_14_M}
    color: ${colors.gray400};
    max-width: 140px;
  }
  .member-name,
  .member-university {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .member-date {
    ${fonts.BODY_14_M}
    color: ${colors.gray200};
    width: 122px;
    margin-right: 36px;
  }
  .member-score-wrap {
    width: 80px;
    margin-right: 22px;
  }
  .member-score {
    ${fonts.BODY_16_M}
    color: ${colors.gray50};
    background-color: ${colors.gray700};
    padding: 5px 13px;
    border-radius: 30px;
    width: fit-content;
    margin: 0 auto;
  }
  .minus-score {
    color: ${colors.error};
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
const StHelperTextWrapper = styled.div`
  position: fixed;
  bottom: 126px;
  right: 60px;
`;

export default SessionDetailPage;
