import { useEffect, useState } from 'react';

import ListWrapper from '@/components/common/ListWrapper';
import Loading from '@/components/common/Loading';
import PartFilter from '@/components/common/PartFilter';
import { useGetMemberList } from '@/services/api/member';
import { precision } from '@/utils';
import { getAuthHeader, getToken } from '@/utils/auth';
import { getPartValue, partTranslator } from '@/utils/session';

import { StListHeader } from './style';

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

  const TABLE_WIDTH = [
    '10%',
    '13.5%',
    '13.5%',
    '12%',
    '12%',
    '5%',
    '5%',
    '5%',
    '5%',
    '12%',
  ];

  const [selectedPart, setSelectedPart] = useState<PART>('ALL');
  const [memberData, setMemberData] = useState<Member[]>([]);

  const { data, isLoading, isError, error } = useGetMemberList(
    32,
    selectedPart,
    getAuthHeader(),
  );

  useEffect(() => {
    if (data) {
      setMemberData(data);
    }
  }, [data]);

  const onChangePart = (part: PART) => {
    setSelectedPart(part);
  };

  return (
    <>
      <StListHeader>
        <h1>출석 총점</h1>
        <PartFilter selected={selectedPart} onChangePart={onChangePart} />
      </StListHeader>
      <ListWrapper tableWidth={TABLE_WIDTH}>
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
              <tr key={`${name}-${university}`}>
                <td>{precision(index + 1, 2)}</td>
                <td className="identify">{name}</td>
                <td className="university">{university}</td>
                <td>{partName}</td>
                <td>{score}</td>
                <td className="attendance">{attendance}</td>
                <td className="attendance">{tardy}</td>
                <td className="attendance">{absent}</td>
                <td className="attendance">{participate}</td>
                <td>
                  <span>관리</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </ListWrapper>
      {isLoading && <Loading />}
    </>
  );
}

export default MemberList;
