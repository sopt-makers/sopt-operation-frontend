import { useEffect, useState } from 'react';

import ListWrapper from '@/components/common/ListWrapper';
import PartFilter from '@/components/common/PartFilter';
import { getMemberList } from '@/services/api/member';
import { precision } from '@/utils';
import { getToken } from '@/utils/auth';
import { getPartValue, partTranslator } from '@/utils/session';

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
  const [memberData, setMemberData] = useState<MemberList[] | undefined>([]);

  useEffect(() => {
    const getData = async () => {
      const accessToken = getToken('ACCESS');
      const authHeader = { Authorization: `${accessToken}` };
      const response = await getMemberList(32, selectedPart, authHeader);
      const membersData = response?.data;
      setMemberData(membersData);
    };
    getData();
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
          {memberData?.map((member, index) => {
            const { part, name, university, score, total } = member;
            const { attendance, tardy, absent, participate } = total;

            const partNameInKorean = getPartValue(partTranslator, part) || part;
            return (
              <tr key={`${name}-${university}`}>
                <td>{precision(index + 1, 2)}</td>
                <td>{name}</td>
                <td>{university}</td>
                <td>{partNameInKorean}</td>
                <td>{score}</td>
                <td>{attendance}</td>
                <td>{tardy}</td>
                <td>{absent}</td>
                <td>{participate}</td>
                <td>
                  <span>관리</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </ListWrapper>
    </>
  );
}

export default TotalScorePage;
