import Footer from '@/components/common/Footer';
import ListWrapper from '@/components/common/ListWrapper';
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

  return (
    <>
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
      <Footer>Footer</Footer>
    </>
  );
}

export default SessionDetailPage;
