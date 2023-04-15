import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { IcManageBtn } from '@/assets/icons';
import ListWrapper from '@/components/common/ListWrapper';
import { getSessionList } from '@/services/api/lecture';
import { precision } from '@/utils';
import { getToken } from '@/utils/auth';
import { getPartValue, partTranslator } from '@/utils/session';

import { StPartIndicator, StSessionIndicator } from './style';

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

  const [lectureData, setLectureData] = useState<Lecture['data']['lectures'][]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = getToken('ACCESS');
      const authHeader = { Authorization: `${accessToken}` };
      const response = await getSessionList(32, authHeader);
      const lecturesData = response?.data.lectures;
      setLectureData(lecturesData);
    };
    fetchData();
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
        {lectureData.map((lecture, index) => {
          const { lectureId, partName, attributeName, name, date, status } =
            lecture;
          const { attendance, tardy, absent, unknown } = status;
          const partNameInKorean =
            getPartValue(partTranslator, partName) || partName;

          return (
            <tr key={lectureId}>
              <td>{precision(index + 1, 2)}</td>
              <td>
                <StPartIndicator>{partNameInKorean}</StPartIndicator>
              </td>
              <td>
                <StSessionIndicator>{attributeName}</StSessionIndicator>
              </td>
              <td>{name}</td>
              <td>{date}</td>
              <td>{attendance}</td>
              <td>{tardy}</td>
              <td>{absent}</td>
              <td>{unknown}</td>
              <td onClick={() => handleManageClick(lecture.lectureId)}>
                <IcManageBtn />
              </td>
            </tr>
          );
        })}
      </tbody>
    </ListWrapper>
  );
}

export default SessionList;
