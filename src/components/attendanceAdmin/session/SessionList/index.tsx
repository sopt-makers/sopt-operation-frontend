import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ListWrapper from '@/components/common/ListWrapper';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/modal';
import PartFilter from '@/components/common/PartFilter';
import { useGetSessionList } from '@/services/api/lecture';
import { precision } from '@/utils';
import { getAuthHeader } from '@/utils/auth';
import { partTranslator } from '@/utils/translator';

import SessionDetailModal from './SessionDetailModal';
import {
  StListHeader,
  StPartIndicator,
  StSessionIndicator,
  StSessionName,
  StTbody,
} from './style';

function SessionList() {
  const router = useRouter();

  const HEADER_LABELS = [
    '순번',
    '파트',
    '세션',
    '세션명',
    '날짜',
    '출석',
    '지각',
    '결석',
    '미정',
    '관리',
  ];

  const TABLE_WIDTH = [
    '11%',
    '6.25%',
    '6.25%',
    '24%',
    '14%',
    '6.5%',
    '6.5%',
    '6.5%',
    '6.5%',
    '14.5%',
  ];

  const [selectedPart, setSelectedPart] = useState<PART>('ALL');
  const [lectureData, setLectureData] = useState<LectureList[]>([]);
  const [isDetailOpen, setIsDetailOpen] = useState<Boolean>(false);
  const [selectedLecture, setSelectedLecture] = useState<number>(0);

  const { data, isLoading, isError, error } = useGetSessionList(
    32,
    selectedPart,
    getAuthHeader(),
  );

  useEffect(() => {
    console.log(selectedLecture);
  }, [selectedLecture]);

  useEffect(() => {
    if (data && 'lectures' in data) {
      setLectureData(data.lectures);
    }
    if (isError) {
      alert(error.error);
    }
  }, [data, error, isError, router]);

  const handleManageClick = (lectureId: number) => {
    router.push(`/attendanceAdmin/session/${lectureId}`);
  };

  const onChangePart = (part: PART) => {
    setSelectedPart(part);
  };

  return (
    <>
      <StListHeader>
        <h1>출석 세션</h1>
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
        <StTbody>
          {lectureData?.map((lecture, index) => {
            const { lectureId, partValue, attributeName, name, date, status } =
              lecture;
            const { attendance, tardy, absent, unknown } = status;
            const part = partTranslator[partValue] || partValue;
            return (
              <tr key={lectureId} onClick={() => handleManageClick(lectureId)}>
                <td>{precision(index + 1, 2)}</td>
                <td className="indicator">
                  <StPartIndicator>{part}</StPartIndicator>
                </td>
                <td className="indicator">
                  <StSessionIndicator attributeName={attributeName}>
                    {attributeName}
                  </StSessionIndicator>
                </td>
                <td>
                  <StSessionName>{name}</StSessionName>
                </td>
                <td>{date}</td>
                <td className="attendance">{attendance}</td>
                <td className="attendance">{tardy}</td>
                <td className="attendance">{absent}</td>
                <td className="attendance">{unknown}</td>
                <td>
                  <span
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedLecture(lectureId);
                      setIsDetailOpen(true);
                    }}>
                    조회
                  </span>
                </td>
              </tr>
            );
          })}
        </StTbody>
      </ListWrapper>
      {isDetailOpen && (
        <Modal>
          <SessionDetailModal
            onClose={() => setIsDetailOpen(!isDetailOpen)}
            lectureId={selectedLecture}
          />
        </Modal>
      )}
      {isLoading && <Loading />}
    </>
  );
}

export default SessionList;
