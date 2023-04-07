import styled from '@emotion/styled';
import { useState } from 'react';

import Button from '@/components/common/Button';
import Footer from '@/components/common/Footer';
import ListWrapper from '@/components/common/ListWrapper';
import PartFilter from '@/components/common/PartFilter';
import { attendanceInit, sessionDetailDummy } from '@/data/sessionData';
import { precision } from '@/utils';

function SessionDetailPage() {
  const HEADER_LABELS = [
    '순번',
    '회원명',
    '학교명',
    '1차 출석 상태',
    '1차 출석 일시',
    '2차 출석 상태',
    '2차 출석 일시',
    '변동점수',
  ];

  const [selectedPart, setSelectedPart] = useState<PART>('ALL');

  const onChangePart = (part: PART) => {
    setSelectedPart(part);
  };

  return (
    <>
      <PartFilter selected={selectedPart} onChangePart={onChangePart} />
      <ListWrapper>
        <thead>
          <tr>
            {HEADER_LABELS.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sessionDetailDummy.members.map((member, index) => {
            const firstRound =
              member.attendances.find((item) => item.round === 1) ??
              attendanceInit;
            const secondRound =
              member.attendances.find((item) => item.round === 2) ??
              attendanceInit;

            return (
              <tr key={`${member.name}-${member.university}`}>
                <td>{precision(index + 1, 2)}</td>
                <td>{member.name}</td>
                <td>{member.university}</td>
                <td>{firstRound.status}</td>
                <td>{firstRound.date}</td>
                <td>{secondRound.status}</td>
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
    </>
  );
}

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
