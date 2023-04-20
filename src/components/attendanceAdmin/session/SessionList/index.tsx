import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ListWrapper from '@/components/common/ListWrapper';
import { getSessionList } from '@/services/api/lecture';
import { precision } from '@/utils';
import { getToken } from '@/utils/auth';
import { partTranslator } from '@/utils/translator';

import { SessionInfo, StPartIndicator, StSessionIndicator } from './style';

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

  const [lectureData, setLectureData] = useState<LectureList[] | undefined>([]);

  useEffect(() => {
    const getData = async () => {
      const accessToken = getToken('ACCESS');
      const authHeader = { Authorization: `${accessToken}` };
      const response = await getSessionList(32, authHeader);
      const lecturesData = response?.data.lectures;
      setLectureData(lecturesData);
    };
    getData();
  }, []);

  const handleManageClick = (lectureId: number) => {
    router.push(`/attendanceAdmin/session/${lectureId}`);
  };

  return (
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
  );
}

export default SessionList;
