import { useEffect, useState } from 'react';

import ListWrapper from '@/components/common/ListWrapper';
import PartFilter from '@/components/common/PartFilter';
import { getMemberList } from '@/services/api/member';
import { precision } from '@/utils';
import { getToken } from '@/utils/auth';
import { getPartValue, partTranslator } from '@/utils/session';

import { StListHeader, StMemberInfo } from './style';

function MemberList() {
  const HEADER_LABELS = [
    '순번',
    '회원명',
    '학교명',
    '파트명',
    '총점',
    '출석',
    '지각',
    '결석',
    '참여',
    '관리',
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
      <StListHeader>
        <h1>출석 총점</h1>
        <PartFilter selected={selectedPart} onChangePart={onChangePart} />
      </StListHeader>
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
            const partName = getPartValue(partTranslator, part) || part;
            return (
              <StMemberInfo key={`${name}-${university}`}>
                <td>{precision(index + 1, 2)}</td>
                <td className="identify">{name}</td>
                <td className="identify">{university}</td>
                <td>{partName}</td>
                <td>{score}</td>
                <td className="attendance">{attendance}</td>
                <td className="attendance">{tardy}</td>
                <td className="attendance">{absent}</td>
                <td className="attendance">{participate}</td>
                <td>
                  <span>관리</span>
                </td>
              </StMemberInfo>
            );
          })}
        </tbody>
      </ListWrapper>
    </>
  );
}

export default MemberList;
