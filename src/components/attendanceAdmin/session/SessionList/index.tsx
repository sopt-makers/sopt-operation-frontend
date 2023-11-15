import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import IcDate from '@/assets/icons/IcDate.svg';
import IcMore from '@/assets/icons/IcMore.svg';
import IcPlace from '@/assets/icons/IcPlace.svg';
import Chip from '@/components/common/Chip';
import ListWrapper from '@/components/common/ListWrapper';
import Loading from '@/components/common/Loading';
import PartFilter from '@/components/common/PartFilter';
import { currentGenerationState } from '@/recoil/atom';
import { deleteSession } from '@/services/api/lecture';
import { useGetSessionList } from '@/services/api/lecture/query';
import { partTranslator } from '@/utils/translator';

import { StActionButton, StListHeader, StListItem } from './style';

function SessionList() {
  const router = useRouter();

  const [selectedPart, setSelectedPart] = useState<PART>('ALL');
  const [lectureData, setLectureData] = useState<LectureList[]>([]);
  const [isDetailOpen, setIsDetailOpen] = useState<Boolean>(false);
  const [selectedLecture, setSelectedLecture] = useState<number>(0);
  const currentGeneration = useRecoilValue(currentGenerationState);

  const { data, isLoading, isError, error } = useGetSessionList(
    parseInt(currentGeneration),
    selectedPart,
  );

  useEffect(() => {
    if (data && 'lectures' in data) {
      setLectureData(data.lectures);
    }
    if (isError) {
      alert(error);
    }
  }, [data, error, isError, router]);

  const handleManageClick = (lectureId: number) => {
    router.push(`/attendanceAdmin/session/${lectureId}`);
  };

  const onChangePart = (part: PART) => {
    setSelectedPart(part);
  };

  const handleDeleteSession = (lectureId: number) => {
    const isConfirmed = confirm(
      '세션을 삭제하면 복구할 수 없습니다.\n정말 삭제할까요?',
    );
    if (isConfirmed) {
      deleteSession(lectureId);
      alert('세션이 삭제되었습니다.');
    }
  };

  return (
    <>
      <StListHeader>
        <h1>출석 세션</h1>
        <PartFilter selected={selectedPart} onChangePart={onChangePart} />
        <p>총 {lectureData.length}개</p>
      </StListHeader>
      <ListWrapper>
        {lectureData?.map((lecture, index) => {
          const {
            lectureId,
            partValue,
            attributeName,
            name,
            startDate,
            attendances,
          } = lecture;
          const { attendance, tardy, absent, unknown } = attendances;
          const part = partTranslator[partValue] || partValue;
          const date = dayjs(startDate);
          const formattedDate = date.format('YYYY년 MM월 DD일 HH:mm');

          return (
            <StListItem
              key={lectureId}
              onClick={() => handleManageClick(lectureId)}>
              <div>
                <div className="left-top">
                  <p>{name}</p>
                  <Chip text={part} />
                  <Chip text={attributeName} />
                </div>
                <div className="left-bottom">
                  <p>
                    출석<span>{attendance}</span>
                  </p>
                  <p>
                    지각<span>{tardy}</span>
                  </p>
                  <p>
                    결석<span>{absent}</span>
                  </p>
                  <p>
                    미정<span>{unknown}</span>
                  </p>
                </div>
              </div>
              <div className="right">
                <div>
                  <p>
                    <IcDate />
                    {formattedDate}
                  </p>
                  <p>
                    <IcPlace />
                    장소
                  </p>
                </div>
                <div>
                  <StActionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLecture(lectureId);
                      setIsDetailOpen(true);
                      console.log('눌렸습니다.');
                    }}>
                    <IcMore />
                  </StActionButton>
                  <div className="delete_dropdown">
                    <p>삭제하기</p>
                  </div>
                </div>
              </div>
            </StListItem>
          );
        })}
      </ListWrapper>
      {isLoading && <Loading />}
    </>
  );
}

export default SessionList;
