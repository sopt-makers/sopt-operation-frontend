import { useEffect, useState } from 'react';

import { IcCheckBox, IcModalClose } from '@/assets/icons';
import Button from '@/components/common/Button';
import InputContainer from '@/components/common/inputContainer';
import { deleteSession, useGetLectureDetail } from '@/services/api/lecture';
import { getAuthHeader } from '@/utils/auth';

import {
  StFooter,
  StHeader,
  StInformationSection,
  StTitle,
  StWrapper,
} from './style';

interface Props {
  onClose: () => void;
  lectureId: number;
}

const SessionDetailModal = (props: Props) => {
  const { onClose, lectureId } = props;
  const [lectureDetailData, setLectureDetailData] = useState<LectureDetail>();

  const { data, isLoading, isError, error } = useGetLectureDetail(
    lectureId,
    getAuthHeader(),
  );

  useEffect(() => {
    setLectureDetailData(data);
  }, [data]);

  const handleDeleteSession = () => {
    const isConfirmed = confirm(
      '세션을 삭제하면 복구할 수 없습니다.\n정말 삭제할까요?',
    );
    if (isConfirmed) {
      deleteSession(lectureId, getAuthHeader());
      alert('세션이 삭제되었습니다.');
      onClose();
    }
  };

  const handleAttributeDescription = (attr: string | undefined) => {
    switch (attr) {
      case '세미나':
        return '미 출석 시 출석 점수 감점';
      case '행사':
        return '출석 시 0.5점 부여';
      case '기타':
        return '출석 점수 미반영';
    }
  };

  return (
    <>
      <button
        onClick={() => {
          console.log(lectureDetailData);
        }}>
        데이터 나와라 얍
      </button>
      <StWrapper>
        <StHeader>
          <StTitle>
            <h1>세션 정보</h1>
            <IcModalClose onClick={onClose} />
          </StTitle>
          <h2>생성된 SOPT 세션 정보를 조회합니다.</h2>
        </StHeader>
        <StInformationSection>
          <p>{data?.part}</p>
          <div>
            <InputContainer title="세션명">
              <span>{data?.name}</span>
            </InputContainer>
            <InputContainer title="세션 장소">
              <span>{data?.place}</span>
            </InputContainer>
          </div>
          <div>
            <InputContainer title="세션 날짜">
              <span>{`${data?.startDate[0]}/${data?.startDate[1]}/${data?.startDate[2]}`}</span>
            </InputContainer>
            <div className="time">
              <InputContainer title="시작 시각">
                <span>{`${data?.startDate[3]}:${data?.startDate[4]}`}</span>
              </InputContainer>
              <InputContainer title="종료 시각">
                <span>{`${data?.endDate[3]}:${data?.endDate[4]}`}</span>
              </InputContainer>
            </div>
          </div>
        </StInformationSection>
      </StWrapper>
      <StFooter>
        <div>
          <IcCheckBox isChecked={true} />
          <label>
            <h3>{data?.attribute}</h3>
            <p>{handleAttributeDescription(data?.attribute)}</p>
          </label>
        </div>
        <Button
          type={'button'}
          text="세션 삭제하기"
          onClick={handleDeleteSession}
        />
      </StFooter>
    </>
  );
};

export default SessionDetailModal;
