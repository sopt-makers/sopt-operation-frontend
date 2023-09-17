import { RefObject, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import ListWrapper from '@/components/common/ListWrapper';
import Loading from '@/components/common/Loading';
import PartFilter from '@/components/common/PartFilter';
import { PAGE_SIZE } from '@/data/queryData';
import useObserver from '@/hooks/useObserver';
import { currentGenerationState } from '@/recoil/atom';
import { useGetInfiniteMemberList } from '@/services/api/member/query';
import { precision } from '@/utils';
import { getPartValue, partTranslator } from '@/utils/session';

import MemberDetail from '../MemberDetail';
import { StListHeader, StMemberName, StMemberUniversity } from './style';

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
  const [selectedMember, setSelectedMember] = useState<ScoreMember | null>(
    null,
  );
  const bottomRef: RefObject<HTMLDivElement> = useRef(null);
  const currentGeneration = useRecoilValue(currentGenerationState);

  const {
    data: members,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = useGetInfiniteMemberList(parseInt(currentGeneration), selectedPart);

  useObserver({
    target: bottomRef,
    fetchNextPage,
  });

  const onChangePart = (part: PART) => {
    setSelectedPart(part);
  };

  const onChangeMember = (member: ScoreMember) => {
    setSelectedMember(member);
  };

  const onCloseModal = () => {
    setSelectedMember(null);
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
          {members?.pages.map((pageMembers, pageIndex) =>
            pageMembers.map((member, index) => {
              const { part, name, university, score, total } = member;
              const { attendance, tardy, absent, participate } = total;
              const partName = getPartValue(partTranslator, part) || part;

              return (
                <tr key={`${name}-${university}`}>
                  <td>{precision(pageIndex * PAGE_SIZE + index + 1, 2)}</td>
                  <td className="identify">
                    <StMemberName>{name}</StMemberName>
                  </td>
                  <td className="university">
                    <StMemberUniversity>{university}</StMemberUniversity>
                  </td>
                  <td>{partName}</td>
                  <td>{score}</td>
                  <td className="attendance">{attendance}</td>
                  <td className="attendance">{tardy}</td>
                  <td className="attendance">{absent}</td>
                  <td className="attendance">{participate}</td>
                  <td onClick={() => onChangeMember(member)}>
                    <span>조회</span>
                  </td>
                </tr>
              );
            }),
          )}
        </tbody>
      </ListWrapper>

      <div ref={bottomRef} />
      {isFetchingNextPage && <Loading />}

      {status === 'loading' && <Loading />}

      {selectedMember && (
        <MemberDetail memberId={selectedMember.id} onClose={onCloseModal} />
      )}
    </>
  );
}

export default MemberList;
