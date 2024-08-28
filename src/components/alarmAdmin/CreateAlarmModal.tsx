import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useImmerReducer } from 'use-immer';

import { IcDeleteFile, IcUpload } from '@/assets/icons';
import Button from '@/components/common/Button';
import DropDown from '@/components/common/DropDown';
import Input from '@/components/common/Input';
import Loading from '@/components/common/Loading';
import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';
import OptionTemplate from '@/components/common/OptionTemplate';
import Selector from '@/components/common/Selector';
import { currentGenerationState } from '@/recoil/atom';
import { postNewAlarm } from '@/services/api/alarm';
import { readPlaygroundId, TARGET_USER_LIST } from '@/utils/alarm';
import { partList, partTranslator } from '@/utils/session';

interface Props {
  onClose: () => void;
  alarmId?: number;
}

type Action =
  | { type: 'SET_PART'; payload: string | null }
  | { type: 'SET_IS_ACTIVE'; payload: boolean | null }
  | { type: 'SET_TARGET_LIST'; payload: string[] | null }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'SET_LINK'; payload: string | null };

const postAlarmReducer = (draft: PostAlarmData, action: Action): void => {
  switch (action.type) {
    case 'SET_PART':
      draft.part = action.payload;
      break;
    case 'SET_IS_ACTIVE':
      draft.isActive = action.payload;
      break;
    case 'SET_TARGET_LIST':
      draft.targetList = action.payload;
      break;
    case 'SET_TITLE':
      draft.title = action.payload;
      break;
    case 'SET_CONTENT':
      draft.content = action.payload;
      break;
    case 'SET_LINK':
      draft.link = action.payload;
      break;
    default:
      throw new Error('Unknown action type');
  }
};

const initialState: PostAlarmData = {
  target: '활동 회원',
  part: '발송 파트',
  isActive: true,
  targetList: null,
  title: '',
  content: '',
  linkType: '첨부 안함',
  link: null,
};

function CreateAlarmModal(props: Props) {
  const { onClose, alarmId } = props;

  const [state, dispatch] = useImmerReducer(postAlarmReducer, initialState);

  const [dropdownVisibility, setDropdownVisibility] = useState({
    part: false,
    target: false,
    generation: false,
    targetSelector: false,
  });
  const [isActiveUser, setIsActiveUser] = useState<string>('활동 회원');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(true);
  const currentGeneration = useRecoilValue(currentGenerationState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isActiveUser === '활동 회원') {
      dispatch({ type: 'SET_IS_ACTIVE', payload: true });
    } else {
      dispatch({ type: 'SET_IS_ACTIVE', payload: false });
    }
    if (isActiveUser === '특정 유저 지정') {
      dispatch({ type: 'SET_PART', payload: '발송 파트' });
      dispatch({ type: 'SET_IS_ACTIVE', payload: null });
    }
  }, [dispatch, isActiveUser]);

  useEffect(() => {
    if (
      (state.part !== '발송 파트' &&
        state.title !== '' &&
        state.content !== '') ||
      (uploadedFile !== null &&
        isActiveUser === 'CSV 첨부' &&
        state.content !== '' &&
        state.title !== '')
    ) {
      setIsReadyToSubmit(false);
    } else {
      setIsReadyToSubmit(true);
    }
  }, [isActiveUser, state.content, state.part, state.title, uploadedFile]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    let apiPartValue = state.part ? partTranslator[state.part] : null;
    let apiIsActive = state.isActive;
    let targetListValue = state.targetList;

    if (isActiveUser === 'CSV 첨부') {
      apiPartValue = null;
      apiIsActive = null;
    }

    if (isActiveUser !== 'CSV 첨부') {
      targetListValue = null;
    }

    const payload = {
      ...state,
      generation: parseInt(currentGeneration),
      part: apiPartValue,
      isActive: apiIsActive,
      targetList: targetListValue,
    };

    await postNewAlarm(payload);
    setIsSubmitting(false);
    onClose();
  };

  const toggleDropdown = (type: AlarmDropdownType) => {
    setDropdownVisibility((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const userIds = await readPlaygroundId(file);
        setUploadedFile(file);
        dispatch({ type: 'SET_TARGET_LIST', payload: userIds });
      } catch (error) {
        console.error('파일을 읽는데 실패했습니다.', error);
      }
    }
  };

  if (isSubmitting) return <Loading />;
  return (
    <StAlarmModalWrapper>
      <ModalHeader
        title="알림 생성"
        desc="APP으로 발송할 알림을 생성합니다."
        onClose={onClose}
      />
      <main>
        <div className="dropdowns">
          <OptionTemplate title="발송 대상">
            <Selector
              content={isActiveUser}
              onClick={() => toggleDropdown('target')}
              isDisabledValue={false}
            />
            {dropdownVisibility.target && (
              <DropDown
                type={'select'}
                list={TARGET_USER_LIST}
                onItemSelected={(value) => {
                  setIsActiveUser(value);
                  toggleDropdown('target');
                }}
              />
            )}
          </OptionTemplate>
          {isActiveUser !== 'CSV 첨부' && (
            <OptionTemplate title="파트">
              <Selector
                content={state.part}
                onClick={() => toggleDropdown('part')}
                isDisabledValue={state.part === '발송 파트'}
              />
              {dropdownVisibility.part && (
                <DropDown
                  type={'select'}
                  list={partList}
                  onItemSelected={(value) => {
                    dispatch({ type: 'SET_PART', payload: value });
                    toggleDropdown('part');
                  }}
                />
              )}
            </OptionTemplate>
          )}
        </div>
        <div className="inputs">
          {isActiveUser === 'CSV 첨부' && (
            <OptionTemplate title="CSV 파일 첨부">
              <StCsvUploader>
                {uploadedFile ? (
                  <div className="uploaded">
                    <span>{uploadedFile.name}</span>
                    <IcDeleteFile onClick={() => setUploadedFile(null)} />
                  </div>
                ) : (
                  <div
                    className="pre_upload"
                    onClick={() =>
                      document.getElementById('csvUploaderInput')?.click()
                    }>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCSVUpload}
                      style={{ display: 'none' }}
                      id="csvUploaderInput"
                    />
                    <IcUpload />
                    눌러서 첨부하기
                  </div>
                )}
              </StCsvUploader>
            </OptionTemplate>
          )}
          <OptionTemplate title="알림 제목">
            <Input
              type="text"
              placeholder="발송할 알림의 제목을 입력하세요."
              value={state.title}
              onChange={(e) => {
                dispatch({ type: 'SET_TITLE', payload: e.target.value });
              }}
            />
          </OptionTemplate>
          <OptionTemplate title="알림 내용">
            <StTextArea
              placeholder="발송할 알림의 내용을 입력하세요."
              value={state.content}
              onChange={(e) => {
                dispatch({ type: 'SET_CONTENT', payload: e.target.value });
              }}
            />
          </OptionTemplate>
          <OptionTemplate title="링크 첨부">
            <Selector content="기능 추가 예정입니다." isDisabledValue={true} />
          </OptionTemplate>
        </div>
      </main>
      <ModalFooter>
        <Button type={'button'} text="취소하기" onClick={onClose} />
        <Button
          type={'submit'}
          text="알림 생성하기"
          disabled={isReadyToSubmit}
          onClick={() => handleSubmit()}
        />
      </ModalFooter>
    </StAlarmModalWrapper>
  );
}

export default CreateAlarmModal;

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

const StCsvUploader = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  padding: 1rem 1.4rem;

  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.4rem; /* 150% */
  letter-spacing: -0.032rem;

  color: ${colors.gray400};
  background-color: ${colors.gray700};

  border-radius: 0.8rem;

  cursor: pointer;

  & > div.uploaded {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    color: ${colors.gray10};

    & > svg {
      &:hover {
        fill: ${colors.gray600};
      }
      &:active {
        fill: ${colors.gray500};
      }
    }
  }

  & > div.pre_upload {
    width: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    gap: 1rem;
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
