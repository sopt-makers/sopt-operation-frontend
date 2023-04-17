import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import Footer from '@/components/common/Footer';
import ListWrapper from '@/components/common/ListWrapper';
import Loading from '@/components/common/Loading';
import PartFilter from '@/components/common/PartFilter';
import Select from '@/components/session/Select';
import {
  attendanceInit,
  eventAttendanceOptions,
  seminarAttendanceOptions,
} from '@/data/sessionData';
import { getSessionDetail } from '@/services/api/lecture';
import { precision } from '@/utils';
import { getToken } from '@/utils/auth';

const HEADER_LABELS = [
  'ㅤ순번ㅤ',
  'ㅤ회원명ㅤ',
  'ㅤ학교명ㅤ',
  '1차 출석 상태',
  '1차 출석 일시',
  '2차 출석 상태',
  '2차 출석 일시',
  '변동점수',
  'ㅤㅤㅤㅤㅤ',
];

function SessionDetailPage() {
  const router = useRouter();
  const id =
    typeof router.query.id === 'string' ? Number(router.query.id) : null;

  const [selectedPart, setSelectedPart] = useState<PART>('ALL');
  const [session, setSession] = useState<SessionDetail>();

  useEffect(() => {
    if (!router.isReady) return;
    if (!id) return;

    (async () => {
      const result = await getSessionDetail(id, selectedPart, {
        Authorization: getToken('ACCESS'),
      });
      if ('error' in result) {
        alert(result.error);
      } else {
        setSession(result);
      }
    })();
  }, [id, selectedPart, router.isReady]);

  const onChangePart = (part: PART) => {
    setSelectedPart(part);
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
            <p>출석 {0}</p>
            <p>지각 {0}</p>
            <p>결석 {0}</p>
            <p>미정 {0}</p>
          </div>
        </div>
        <PartFilter selected={selectedPart} onChangePart={onChangePart} />
      </StPageHeader>

      <ListWrapper>
        <thead>
          <tr>
            {HEADER_LABELS.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {session?.members?.map((member, index) => {
            const firstRound =
              member.attendances.find((item) => item.round === 1) ??
              attendanceInit;
            const secondRound =
              member.attendances.find((item) => item.round === 2) ??
              attendanceInit;

            return (
              <tr key={`${member.name}-${member.university}`}>
                <td>{precision(index + 1, 2)}</td>
                <td className="member-name">{member.name + '하이하이하이'}</td>
                <td className="member-university">{member.university}</td>
                <td>
                  <Select
                    selected={firstRound.status}
                    options={seminarAttendanceOptions}
                    onChange={(value) => console.log(value)}
                  />
                </td>
                <td className="member-date">{firstRound.date}</td>
                <td>
                  <Select
                    selected={secondRound.status}
                    options={seminarAttendanceOptions}
                    onChange={(value) => console.log(value)}
                  />
                </td>
                <td className="member-date">{secondRound.date}</td>
                <td>{member.score}점</td>
                <td className="member-update">
                  <button>갱신</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </ListWrapper>

      <Footer>
        <StFooterContents>
          <div className="button-wrap">
            <Button type="submit" text="1차 출석 시작하기" />
            <Button type="submit" text="2차 출석 시작하기" disabled />
          </div>
        </StFooterContents>
      </Footer>
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
