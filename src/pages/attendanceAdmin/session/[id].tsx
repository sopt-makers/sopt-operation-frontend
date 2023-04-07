import styled from '@emotion/styled';
import { useState } from 'react';

import Button from '@/components/common/Button';
import Footer from '@/components/common/Footer';
import ListWrapper from '@/components/common/ListWrapper';
import PartFilter from '@/components/common/PartFilter';
import Select from '@/components/session/Select';
import {
  attendanceInit,
  attendanceOptions,
  sessionDetailDummy,
} from '@/data/sessionData';
import { precision } from '@/utils';

const HEADER_LABELS = [
  'ㅤ순번ㅤ',
  '회원명',
  '학교명',
  '1차 출석 상태',
  '1차 출석 일시',
  '2차 출석 상태',
  '2차 출석 일시',
  '변동점수',
];

function SessionDetailPage() {
  const [selectedPart, setSelectedPart] = useState<PART>('ALL');
  const [session, setSession] = useState<SessionDetail>(sessionDetailDummy);
  const [members, setMembers] = useState<Member[]>(sessionDetailDummy.members);

  const onChangePart = (part: PART) => {
    setSelectedPart(part);
  };

  return (
    <StPageWrapper>
      <StPageHeader>
        <div className="session-info">
          <h2>
            <strong>1차 세미나</strong> 출석 관리
          </h2>
          <div className="attendance-info">
            <p>출석 100</p>
            <p>지각 29</p>
            <p>결석 3</p>
            <p>미정 45</p>
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
          {members.map((member, index) => {
            const firstRound =
              member.attendances.find((item) => item.round === 1) ??
              attendanceInit;
            const secondRound =
              member.attendances.find((item) => item.round === 2) ??
              attendanceInit;

            return (
              <tr key={`${member.name}-${member.university}`}>
                <td>{precision(index + 1, 2)}</td>
                <td className="member-name">
                  <p>{member.name}</p>
                </td>
                <td className="member-university">
                  <p>{member.university}</p>
                </td>
                <td>
                  <Select
                    selected={firstRound.status}
                    options={attendanceOptions}
                    onChange={(value) => console.log(value)}
                  />
                </td>
                <td>{firstRound.date}</td>
                <td>
                  <Select
                    selected={secondRound.status}
                    options={attendanceOptions}
                    onChange={(value) => console.log(value)}
                  />
                </td>
                <td>{secondRound.date}</td>
                <td>{member.score}</td>
              </tr>
            );
          })}
        </tbody>
      </ListWrapper>

      <Footer>
        <StFooterContents>
          <div className="code-wrap">
            <p>1차 출석코드</p>
            <p>80182</p>
          </div>
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
  .member-name p,
  .member-university p {
    max-width: 7.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 auto;
  }
  .member-university p {
    max-width: 7.6rem;
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
  .code-wrap {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-size: 1.6rem;
    line-height: 2.2rem;
    font-weight: 600;
    & > p:first-of-type {
      color: ${({ theme }) => theme.color.grayscale.gray100};
    }
    & > p:last-of-type {
      color: ${({ theme }) => theme.color.grayscale.white100};
      background-color: ${({ theme }) => theme.color.main.purple100};
      padding: 0.4rem 1rem;
      border-radius: 0.4rem;
    }
  }
  .button-wrap {
    display: flex;
    gap: 2.4rem;
  }
`;

export default SessionDetailPage;
