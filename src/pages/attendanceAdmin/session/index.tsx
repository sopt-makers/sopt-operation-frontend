import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import Footer from '@/components/common/Footer';
import ListWrapper from '@/components/common/ListWrapper';
import { getSessionList } from '@/services/api/lecture';
import { precision } from '@/utils';
import { getToken } from '@/utils/auth';
function SessionPage() {
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [lectureData, setLectureData] = useState<Lecture['lectures']>([]);

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
    <>
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
            return (
              <tr key={lecture.lectureId}>
                <td>{precision(index + 1, 2)}</td>
                <td>
                  <span className="part">{lecture.partName}</span>
                </td>
                <td>
                  <span className="session">{lecture.attributeName}</span>
                </td>
                <td>{lecture.name}</td>
                <td>{lecture.date}</td>
                <td>{lecture.status.attendance}</td>
                <td>{lecture.status.tardy}</td>
                <td>{lecture.status.absent}</td>
                <td>{lecture.status.unknown}</td>
                <td onClick={() => handleManageClick(lecture.lectureId)}>
                  관리
                </td>
              </tr>
            );
          })}
        </tbody>
      </ListWrapper>
      <Footer>
        <Button
          onClick={() => setIsModalOpen(!isModalOpen)}
          type={'submit'}
          text={'세션 생성하기'}
        />
      </Footer>
    </>
  );
}

export default SessionPage;
