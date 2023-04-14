import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import Footer from '@/components/common/Footer';
import ListWrapper from '@/components/common/ListWrapper';
import { attendanceInit, sessionDetailDummy } from '@/data/sessionData';
import { getSessionList } from '@/services/api/user/user';
import { precision } from '@/utils';

function SessionPage() {
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
  const [lectureData, setLectureData] = useState<Lecture | null>(null); // lectureData 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSessionList();
      console.log(data);
      setLectureData(data);
    };

    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
          {sessionDetailDummy.members.map((member, index) => {
            return (
              <tr key={`${member.name}-${member.university}`}>
                <td>{precision(index + 1, 2)}</td>
                <td>전체</td>
                <td>세미나</td>
                <td>00차 세미나</td>
                <td>2023/00/00</td>
                <td>000</td>
                <td>000</td>
                <td>000</td>
                <td>000</td>
                <td>관리</td>
              </tr>
            );
          })}
        </tbody>
      </ListWrapper>
      <Footer>
        <Button onClick={toggleModal} type={'submit'} text={'세션 생성하기'} />
      </Footer>
    </>
  );
}

export default SessionPage;
