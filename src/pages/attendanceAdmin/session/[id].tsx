import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { ReactNode, RefObject, useRef, useState } from 'react';

import AttendanceModal from '@/components/attendanceAdmin/session/AttendanceModal';
import Chip from '@/components/common/Chip';
import FloatingButton from '@/components/common/FloatingButton';
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
import { useUnauthorizedStatus } from '@/hooks/useUnauthorizedStatus';
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
import { ACTIVITY_GENERATION } from '@/utils/generation';
import { allPartTranslator, attributeTranslator } from '@/utils/translator';

interface ChangedUpdatedStatus {
  memberId: number;
  firstRoundStatus: ATTEND_STATUS;
  secondRoundStatus: ATTEND_STATUS;
  updatedScore: number;
}

function SessionDetailPage() {
  const router = useRouter();
  const id =
    typeof router.query.id === 'string' ? Number(router.query.id) : null;

  const [selectedPart, setSelectedPart] = useState<PART>('ALL');
  const [changedMembers, setChangedMembers] = useState<SessionMember[]>([]);
  const [changedUpdatedStatusList, setChangedUpdatedStatusList] = useState<
    ChangedUpdatedStatus[]
  >([]);
  const [modal, setModal] = useState<number | null>(null);
  const bottomRef: RefObject<HTMLDivElement> = useRef(null);

  useUnauthorizedStatus('MAKERS');

  const {
    data: session,
    isLoading: isLoadingSession,
    refetch: refetchSession,
    error: sessionError,
  } = useGetSessionDetail(id);

  const {
    data: membersData,
    fetchNextPage,
    isFetchingNextPage,
    status,
    hasNextPage,
    refetch: refetchMembers,
  } = useGetInfiniteSessionMembers(id, selectedPart);

  const members = membersData?.pages.map((item) => item.attendances) ?? [];
  const totalCount = membersData?.pages[0].totalCount ?? 0;

  useObserver({
    target: bottomRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const onChangePart = (part: PART) => {
    setSelectedPart(part);
  };

  const calcUpdatedScore = (
    memberId: number,
    attendances: Attendance[],
    round: number,
    status: ATTEND_STATUS,
  ) => {
    const attribute = session?.attribute;

    const prevStatus = changedUpdatedStatusList.find(
      (item) => item.memberId === memberId,
    );
    const anotherRound = round === 1 ? 2 : 1;
    const anotherRoundStatus = prevStatus
      ? round === 1
        ? prevStatus.secondRoundStatus
        : prevStatus.firstRoundStatus
      : (attendances.find((attendance) => attendance.round === anotherRound)
          ?.status as ATTEND_STATUS);

    const firstRoundStatus = round === 1 ? status : anotherRoundStatus;
    const secondRoundStatus = round === 2 ? status : anotherRoundStatus;
    let updatedScore = 0;

    switch (attribute) {
      case 'SEMINAR':
        if (
          firstRoundStatus === 'ATTENDANCE' &&
          secondRoundStatus === 'ATTENDANCE'
        ) {
          updatedScore = 0;
        } else if (
          firstRoundStatus === 'ATTENDANCE' ||
          secondRoundStatus === 'ATTENDANCE'
        ) {
          updatedScore = -0.5;
        } else {
          updatedScore = -1;
        }
        break;
      case 'EVENT':
        if (
          (firstRoundStatus === 'ATTENDANCE' ||
            firstRoundStatus === 'ABSENT') &&
          secondRoundStatus === 'ATTENDANCE'
        ) {
          updatedScore = 0.5;
        } else {
          updatedScore = 0;
        }
        break;
      case 'ETC':
        updatedScore = 0;
        break;
    }

    const newList = changedUpdatedStatusList.filter(
      (item) => item.memberId !== memberId,
    );
    setChangedUpdatedStatusList([
      ...newList,
      { memberId, firstRoundStatus, secondRoundStatus, updatedScore },
    ]);
  };

  const onChangeStatus = async (
    status: ATTEND_STATUS,
    member: SessionMember,
    round: number,
  ) => {
    setChangedMembers([...changedMembers, member]);
    calcUpdatedScore(member.member.memberId, member.attendances, round, status);
  };

  const onUpdateScore = async (
    memberId: number,
    firstSubAttendanceId: number,
    secondSubAttendanceId: number,
  ) => {
    if (session) {
      const { firstRoundStatus, secondRoundStatus, updatedScore } =
        changedUpdatedStatusList.find(
          (item) => item.memberId === memberId,
        ) as ChangedUpdatedStatus;

      const firstRoundError = await updateMemberAttendStatus(
        firstSubAttendanceId,
        firstRoundStatus,
      );
      const secondRoundError = await updateMemberAttendStatus(
        secondSubAttendanceId,
        secondRoundStatus,
      );
      const updateScoreError = await updateMemberScore(memberId);

      if (firstRoundError || secondRoundError || updateScoreError) {
        alert('출석 점수를 갱신하는데 실패했어요');
      } else {
        setChangedMembers(
          changedMembers.filter(
            (member) => member.member.memberId !== memberId,
          ),
        );
        refetchSession();
      }
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
        return () => {};
    }
  };

  return (
    <StPageWrapper>
      {session && (
        <StPageHeader>
          <div className="title">
            <h1>{session.name} 출석 관리</h1>
            <Chip text={allPartTranslator[session.part]} />
            <Chip text={attributeTranslator[session.attribute]} />
          </div>
          {session.part === 'ALL' && (
            <PartFilter selected={selectedPart} onChangePart={onChangePart} />
          )}
          <div className="attendances">
            <p>총 {totalCount}명</p>
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
          {members.map(
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
                const updatedScore =
                  changedUpdatedStatusList.find(
                    (item) => item.memberId === member.member.memberId,
                  )?.updatedScore ?? member.updatedScore;

                return (
                  <StListItem
                    key={member.member.memberId}
                    className={
                      isChangedMember(member) ? 'focused' : 'no-pointer'
                    }>
                    <p className="member-index">
                      {precision(pageIndex * PAGE_SIZE + index + 1, 2)}
                    </p>
                    <div className="member-info">
                      <div>
                        <p className="member-name">{member.member.name}</p>
                        <Chip text={member.member.part} />
                      </div>
                      <p className="member-university">
                        {member.member.university}
                      </p>
                    </div>
                    <Select
                      selected={firstRound.status}
                      options={attendanceOptions.first}
                      round="1차"
                      onChange={(value) => onChangeStatus(value, member, 1)}
                      generation={String(session.generation)}
                    />
                    <p className="member-date">{firstRoundTime}</p>
                    <Select
                      selected={secondRound.status}
                      options={attendanceOptions.second}
                      round="2차"
                      onChange={(value) => onChangeStatus(value, member, 2)}
                      generation={String(session.generation)}
                    />
                    <p className="member-date">{secondRoundTime}</p>
                    <div className="member-score-wrap">
                      <p
                        className={
                          updatedScore < 0
                            ? 'member-score minus-score'
                            : 'member-score'
                        }>
                        {addPlus(updatedScore)}점
                      </p>
                    </div>
                    <ListActionButton
                      onClick={() =>
                        onUpdateScore(
                          member.member.memberId,
                          firstRound.subAttendanceId,
                          secondRound.subAttendanceId,
                        )
                      }
                      text="갱신"
                      disabled={
                        !(
                          isChangedMember(member) &&
                          String(session.generation) === ACTIVITY_GENERATION
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
            onClose={() => setModal(null)}
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
    ${fontsObject.TITLE_1_32_SB}
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
      ${fontsObject.TITLE_6_16_SB}
      color: ${colors.gray200};
    }
    & > div {
      ${fontsObject.TITLE_7_14_SB}
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
  color: ${colors.gray100};

  .member-index {
    ${fontsObject.BODY_3_14_M}
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
    ${fontsObject.TITLE_5_18_SB}
    color: ${colors.gray30};
    margin-right: 15px;
    max-width: 80px;
  }
  .member-university {
    ${fontsObject.BODY_3_14_M}
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
    ${fontsObject.BODY_3_14_M}
    color: ${colors.gray200};
    width: 122px;
    margin-right: 36px;
  }
  .member-score-wrap {
    width: 80px;
    margin-right: 22px;
  }
  .member-score {
    ${fontsObject.BODY_2_16_M}
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
const StHelperTextWrapper = styled.div`
  position: fixed;
  bottom: 126px;
  right: 60px;
`;

export default SessionDetailPage;
