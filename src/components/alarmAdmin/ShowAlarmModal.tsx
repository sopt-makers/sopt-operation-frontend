import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Input from '@/components/common/Input';
import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';
import OptionTemplate from '@/components/common/OptionTemplate';
import Selector from '@/components/common/Selector';
import { currentGenerationState } from '@/recoil/atom';
import { getAlarm } from '@/services/api/alarm';

interface Props {
  onClose: () => void;
  alarmId: number;
}

function ShowAlarmModal(props: Props) {
  const { onClose, alarmId } = props;

  const generation = useRecoilValue(currentGenerationState);

  const [data, setData] = useState<AlarmDetail>({
    part: null,
    isActive: null,
    title: '',
    content: '',
    link: null,
    createdAt: '',
    sendAt: '',
  });

  useEffect(() => {
    (async () => {
      const alarmData = await getAlarm(alarmId);
      setData(alarmData);
    })();
  }, [alarmId]);

  const activeStatus = useMemo(() => {
    switch (data.isActive) {
      case true:
        return '활동 회원';
      case false:
        return '비활동 회원';
      default:
        return 'CSV 첨부';
    }
  }, [data.isActive]);

  return (
    <StAlarmModalWrapper>
      <ModalHeader title="알림 조회" desc="" onClose={onClose} />
      <main>
        <div className="dropdowns">
          <OptionTemplate title="발송 대상">
            <Selector content={activeStatus} readOnly />
          </OptionTemplate>
          {activeStatus !== 'CSV 첨부' && (
            <>
              <OptionTemplate title="파트">
                <Selector content={data.part} readOnly />
              </OptionTemplate>
              <OptionTemplate title="발송 기수">
                <Selector content={`${generation}기`} readOnly />
              </OptionTemplate>
            </>
          )}
        </div>

        <div className="inputs">
          <OptionTemplate title="알림 제목">
            <Input
              readOnly
              type="text"
              placeholder="발송할 알림의 제목을 입력하세요."
              value={data.title}
            />
          </OptionTemplate>
          <OptionTemplate title="알림 내용">
            <StTextArea
              readOnly
              placeholder="발송할 알림의 내용을 입력하세요."
              value={data.content}
            />
          </OptionTemplate>
          <OptionTemplate title="링크 첨부">
            <Selector content="기능 추가 예정입니다." isDisabledValue={true} />
          </OptionTemplate>
        </div>
      </main>

      <ModalFooter>
        <></>
      </ModalFooter>
    </StAlarmModalWrapper>
  );
}

export default ShowAlarmModal;

const StAlarmModalWrapper = styled.section`
  width: 50.4rem;

  & > main {
    padding: 1.6rem 3rem 3.2rem 3rem;

    & > .type_selector {
      display: flex;
      gap: 2rem;
    }

    & > .dropdowns {
      display: flex;
      gap: 1.6rem;
    }

    & > .inputs {
      display: flex;
      flex-direction: column;
      align-self: stretch;
    }
  }
  & > footer {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const StAlarmTypeButton = styled.button<{
  isSelected: boolean;
  readOnly?: boolean;
}>`
  padding: 0.8rem 2rem;

  border-radius: 11.8rem;

  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  color: ${({ isSelected }) => (isSelected ? colors.gray950 : colors.gray100)};

  background: ${({ isSelected }) => (isSelected ? colors.gray10 : 'none')};

  pointer-events: ${({ readOnly }) => (readOnly ? 'none' : 'auto')};

  &:hover {
    background: ${({ isSelected }) =>
      isSelected ? colors.gray10 : colors.gray700};
  }
  &:active {
    background: ${colors.gray600};
  }
`;

const StTextArea = styled.textarea`
  height: 12.8rem;

  padding: 1rem 1.4rem;

  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 1.8rem */
  letter-spacing: -0.018rem;

  color: ${colors.gray10};
  background-color: ${colors.gray700};
  border: none;
  outline: none;
  resize: none;

  border-radius: 0.8rem;

  &::placeholder {
    color: ${colors.gray400};
  }

  &:not(:read-only):focus {
    background-color: ${colors.gray600};
    outline: 0.1rem solid ${colors.gray300};
  }
  &:focus {
    cursor: default;
  }
`;
