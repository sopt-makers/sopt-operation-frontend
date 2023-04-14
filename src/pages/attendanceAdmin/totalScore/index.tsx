import { useEffect, useState } from 'react';

import ListWrapper from '@/components/common/ListWrapper';
import PartFilter from '@/components/common/PartFilter';
import { attendanceInit, sessionDetailDummy } from '@/data/sessionData';
import { getMemberList } from '@/services/api/member';
import { precision } from '@/utils';
import { getToken } from '@/utils/auth';

function TotalScorePage() {
  const HEADER_LABELS = [
    '순번',
    '회원명',
    '학교명',
    '파트명',
    '총점',
    '전체',
    '출석',
    '지각',
    '결석',
    '조회',
  ];

  const [selectedPart, setSelectedPart] = useState<PART>('ALL');
  const [memberData, setMemberData] = useState<Member[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = getToken('ACCESS');
      const authHeader = { Authorization: `${accessToken}` };
      const response = await getMemberList(32, selectedPart, authHeader);
      const membersData = response?.data;
      setMemberData(membersData);
    };
    fetchData();
  }, [selectedPart]);

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
          {memberData.map((member, index) => {
            return (
              <tr key={`${member.name}-${member.university}`}>
                <td>{precision(index + 1, 2)}</td>
                <td>{member.name}</td>
                <td>{member.university}</td>
                <td>{member.part}</td>
                <td>{member.score}</td>
                <td>{member.total.attendance}</td>
                <td>{member.total.tardy}</td>
                <td>{member.total.absent}</td>
                <td>{member.total.participate}</td>
                <td>조회</td>
              </tr>
            );
          })}
        </tbody>
      </ListWrapper>
    </>
  );
}

export default TotalScorePage;
