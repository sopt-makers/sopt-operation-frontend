import { useEffect, useState } from 'react';

import { IcModalClose } from '@/assets/icons';
import ListWrapper from '@/components/common/ListWrapper';
import Modal from '@/components/common/modal';
import { scoreDetailAttendanceInit } from '@/data/sessionData';
import { getMemberAttendance } from '@/services/api/attendance';
import { precision } from '@/utils';
import { getAuthHeader } from '@/utils/auth';
import { getAttendanceColor } from '@/utils/translator';

import { StModalWrap, StSessionName } from './style';

interface Props {
  memberId: number;
  onClose: () => void;
}

const HEADER_LABELS = [
  '순번',
  '세션명',
  '1차 출석 상태',
  '1차 출석 일시',
  '2차 출석 상태',
  '2차 출석 일시',
  '출석 결과',
  '점수',
];
const TABLE_WIDTH = ['10%', '20%', '10%', '15%', '10%', '15%', '10%', '10%'];

function MemberDetail(props: Props) {
  const { memberId, onClose } = props;

  const [member, setMember] = useState<ScoreMemberDetail>();

  useEffect(() => {
    (async () => {
      const result = await getMemberAttendance(memberId, getAuthHeader());
      result && setMember(result);
    })();
  }, [memberId]);

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

  if (!member) return <></>;
  return (
    <Modal>
      <StModalWrap>
        <button className="close-btn" onClick={() => onClose()}>
          <IcModalClose />
        </button>
        <header>
          <p className="member-name">
            {member.name}
            <span>{member.score}점</span>
          </p>
          <p className="member-part">{member.part}파트</p>
          <p className="member-university">{member.university}</p>
          <p className="member-phone">{member.phone}</p>
        </header>
        <div className="list-head">
          <ListWrapper>
            <thead>
              <tr>
                {HEADER_LABELS.map((label, index) => (
                  <th key={label} style={{ width: TABLE_WIDTH[index] }}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
          </ListWrapper>
        </div>
        <div className="list-body">
          <ListWrapper>
            <tbody>
              {member.lectures.map((lecture, index) => {
                const firstRound =
                  lecture.attendances.find((item) => item.round === 1) ??
                  scoreDetailAttendanceInit;
                const secondRound =
                  lecture.attendances.find((item) => item.round === 2) ??
                  scoreDetailAttendanceInit;

                return (
                  <tr key={lecture.lecture}>
                    <td style={{ width: TABLE_WIDTH[0] }}>
                      {precision(index + 1, 2)}
                    </td>
                    <td style={{ width: TABLE_WIDTH[1] }}>
                      <StSessionName>{lecture.lecture}</StSessionName>
                    </td>
                    <td
                      style={{
                        width: TABLE_WIDTH[2],
                        color: getAttendanceColor(firstRound.status),
                      }}>
                      {firstRound.status}
                    </td>
                    <td style={{ width: TABLE_WIDTH[3] }}>{firstRound.date}</td>
                    <td
                      style={{
                        width: TABLE_WIDTH[4],
                        color: getAttendanceColor(secondRound.status),
                      }}>
                      {secondRound.status}
                    </td>
                    <td style={{ width: TABLE_WIDTH[5] }}>
                      {secondRound.date}
                    </td>
                    <td
                      style={{
                        width: TABLE_WIDTH[6],
                        color: getAttendanceColor(lecture.status),
                      }}>
                      {lecture.status}
                    </td>
                    <td style={{ width: TABLE_WIDTH[7] }}>
                      {lecture.additiveScore}점
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </ListWrapper>
        </div>
      </StModalWrap>
    </Modal>
  );
}

export default MemberDetail;
