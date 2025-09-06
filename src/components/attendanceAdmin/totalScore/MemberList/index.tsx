import { RefObject, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Chip from '@/components/common/Chip';
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
import { StListItem, StPageHeader } from './style';

function MemberList() {
  const [selectedPart, setSelectedPart] = useState<PART>('ALL');
  const [selectedMember, setSelectedMember] = useState<ScoreMember | null>(
    null,
  );
  const bottomRef: RefObject<HTMLDivElement> = useRef(null);
  const currentGeneration = useRecoilValue(currentGenerationState);

  const {
    data: membersData,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = useGetInfiniteMemberList(parseInt(currentGeneration), selectedPart);

  const members = membersData?.pages.map((item) => item.members) ?? [];
  const totalCount = membersData?.pages[0].totalCount ?? 0;

  useObserver({
    target: bottomRef,
    fetchNextPage,
  });

  const onChangePart = (part: PART) => {
    setSelectedPart(part);
  };

  const onShowMemberDetail = (member: ScoreMember) => {
    setSelectedMember(member);
  };

  const onCloseModal = () => {
    setSelectedMember(null);
  };

  return (
    <>
      <StPageHeader>
        <h1>출석 총점</h1>
        <PartFilter selected={selectedPart} onChangePart={onChangePart} />
        <p>총 {totalCount}명</p>
      </StPageHeader>
      <ListWrapper>
        {members.map(
          (pageMembers, pageIndex) =>
            pageMembers &&
            pageMembers.map((member, index) => {
              const { part, name, score, total } = member;
              const { attendance, tardy, absent, participate } = total;
              const partName = getPartValue(partTranslator, part) || part;

              return (
                <StListItem
                  key={`${name}-${part}-${score}`}
                  onClick={() => onShowMemberDetail(member)}>
                  <div className="member-info-wrap">
                    <p className="index">
                      {precision(pageIndex * PAGE_SIZE + index + 1, 2)}
                    </p>
                    <div className="member-info">
                      <div>
                        <p className="member-name">{name}</p>
                        <Chip text={partName} />
                      </div>
                    </div>
                  </div>
                  <div className="member-score-wrap">
                    <p className="attendance">
                      <span>출석</span>
                      {attendance}
                    </p>
                    <p className="attendance">
                      <span>지각</span>
                      {tardy}
                    </p>
                    <p className="attendance">
                      <span>결석</span>
                      {absent}
                    </p>
                    <p className="attendance">
                      <span>미정</span>
                      {participate}
                    </p>
                    <p
                      className={
                        score < 0 ? 'member-score minus-score' : 'member-score'
                      }>
                      {score}점
                    </p>
                  </div>
                </StListItem>
              );
            }),
        )}
      </ListWrapper>

      <div ref={bottomRef} />
      {isFetchingNextPage && <Loading dimmed={false} full={false} />}

      {status === 'loading' && <Loading />}

      {selectedMember && (
        <MemberDetail memberId={selectedMember.id} onClose={onCloseModal} />
      )}
    </>
  );
}

export default MemberList;
