import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ListWrapper from '@/components/common/ListWrapper';
import Loading from '@/components/common/Loading';
import PartFilter from '@/components/common/PartFilter';
import { useGetSessionList } from '@/services/api/lecture';
import { precision } from '@/utils';
import { getAuthHeader, getToken } from '@/utils/auth';
import { partTranslator } from '@/utils/translator';

import {
  SessionInfo,
  StListHeader,
  StPartIndicator,
  StSessionIndicator,
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

  const [selectedPart, setSelectedPart] = useState<PART>('ALL');
  const [lectureData, setLectureData] = useState<LectureList[]>([]);

  const { data, isLoading, isError, error } = useGetSessionList(
    32,
    selectedPart,
    getAuthHeader(),
  );

  useEffect(() => {
    if (data) {
      setLectureData(data.lectures);
    }
  }, [data]);

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
      <ListWrapper>
        <thead>
          <tr>
            {HEADER_LABELS.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lectureData?.map((lecture, index) => {
            const { lectureId, partValue, attributeName, name, date, status } =
              lecture;
            const { attendance, tardy, absent, unknown } = status;
            const part = partTranslator[partValue] || partValue;
            return (
              <SessionInfo key={lectureId}>
                <td>{precision(index + 1, 2)}</td>
                <td className="indicator">
                  <StPartIndicator>{part}</StPartIndicator>
                </td>
                <td className="indicator">
                  <StSessionIndicator attributeName={attributeName}>
                    {attributeName}
                  </StSessionIndicator>
                </td>
                <td>{name}</td>
                <td>{date}</td>
                <td className="attendance">{attendance}</td>
                <td className="attendance">{tardy}</td>
                <td className="attendance">{absent}</td>
                <td className="attendance">{unknown}</td>
                <td onClick={() => handleManageClick(lectureId)}>
                  <span>관리</span>
                </td>
              </SessionInfo>
            );
          })}
        </tbody>
      </ListWrapper>
      {isLoading && <Loading />}
    </>
  );
}

export default SessionList;
