import { Select } from '@sopt-makers/ui';
import { Draft } from 'immer';
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
import {
  readPlaygroundId,
  TARGET_GENERATION_LIST,
  TARGET_USER_LIST,
} from '@/utils/alarm';
import { ACTIVITY_GENERATION } from '@/utils/generation';
import { partList, partTranslator } from '@/utils/session';

import {
  StAlarmModalWrapper,
  StAlarmTypeButton,
  StCsvUploader,
  StTextArea,
} from './style';

interface Props {
  onClose: () => void;
  alarmId?: number;
}

type Action =
  | { type: 'SET_ATTRIBUTE'; payload: string }
  | { type: 'SET_PART'; payload: string }
  | { type: 'TOGGLE_ACTIVE'; payload?: boolean | null }
  | { type: 'SET_GENERATION_AT'; payload: number }
  | { type: 'SET_TARGET_LIST'; payload: string[] | null }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'SET_LINK'; payload: string | null };

const reducer = (draft: Draft<PostAlarmData>, action: Action) => {
  switch (action.type) {
    case 'SET_ATTRIBUTE':
      draft.attribute = action.payload;
      break;
    case 'SET_PART':
      draft.part = action.payload;
      break;
    case 'TOGGLE_ACTIVE':
      draft.isActive = action.payload ?? !draft.isActive;
      break;
    case 'SET_GENERATION_AT':
      draft.generationAt = action.payload;
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
  }
};

const CreateAlarmModal: React.FC<Props> = ({ onClose, alarmId }) => {
  const [state, dispatch] = useImmerReducer(reducer, {
    attribute: 'NOTICE',
    part: '발송 파트',
    isActive: true,
    generationAt: parseInt(ACTIVITY_GENERATION),
    targetList: null,
    title: '',
    content: '',
    link: null,
  });

  const [dropdownVisibility, setDropdownVisibility] = useState({
    part: false,
    target: false,
    generation: false,
    targetSelector: false,
  });
  const [isActiveUser, setIsActiveUser] = useState<string>('활동 회원');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedAlarmType, setSelectedAlarmType] = useState({
    notice: true,
    news: false,
  });
  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(true);
  const currentGeneration = useRecoilValue(currentGenerationState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isActiveUser === '활동 회원') {
      dispatch({ type: 'TOGGLE_ACTIVE', payload: true });
    } else if (isActiveUser === '특정 유저 지정') {
      dispatch({ type: 'SET_PART', payload: '발송 파트' });
      dispatch({ type: 'TOGGLE_ACTIVE', payload: null });
    } else {
      dispatch({ type: 'TOGGLE_ACTIVE', payload: false });
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

    console.log(payload);
    // await postNewAlarm(payload);
    setIsSubmitting(false);
    // onClose();
  };

  const toggleDropdown = (type: keyof typeof dropdownVisibility) => {
    setDropdownVisibility((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const userIds = await readPlaygroundId(file); // CSV 파일에서 사용자 ID 읽기
        setUploadedFile(file); // 파일 상태 업데이트 (별도의 상태 관리가 필요하면 유지)
        dispatch({ type: 'SET_TARGET_LIST', payload: userIds }); // Immer를 사용한 상태 업데이트
      } catch (error) {
        console.error('파일을 읽는데 실패했습니다.', error);
      }
    }
  };

  const handleAlarmType = (type: string): void => {
    if (type === 'NOTICE') {
      dispatch({ type: 'SET_ATTRIBUTE', payload: 'NOTICE' });
      setSelectedAlarmType({ notice: true, news: false });
    }
    if (type === 'NEWS') {
      dispatch({ type: 'SET_ATTRIBUTE', payload: 'NEWS' });
      setSelectedAlarmType({ notice: false, news: true });
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
        <div className="type_selector">
          <StAlarmTypeButton
            type="button"
            onClick={() => handleAlarmType('NOTICE')}
            isSelected={selectedAlarmType.notice}>
            공지
          </StAlarmTypeButton>
          <StAlarmTypeButton
            type="button"
            onClick={() => handleAlarmType('NEWS')}
            isSelected={selectedAlarmType.news}>
            소식
          </StAlarmTypeButton>
        </div>
        <div className="dropdowns">
          <OptionTemplate title="발송 대상">
            <Select
              type="text"
              defaultValue={'활동 회원'}
              options={[
                { label: '활동 회원', value: '활동 회원' },
                { label: '34기', value: '34기' },
              ]}
              onChange={() => console.log('CHANGED!!')}
            />
          </OptionTemplate>
          {isActiveUser !== 'CSV 첨부' && (
            <>
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
              <OptionTemplate title="발송 기수">
                <Selector
                  content={`${state.generationAt}기`}
                  onClick={() => toggleDropdown('generation')}
                  isDisabledValue={state.isActive === true}
                />
                {dropdownVisibility.generation && state.isActive === false && (
                  <DropDown
                    type={'select'}
                    list={TARGET_GENERATION_LIST.filter(
                      (item) => !item.includes(ACTIVITY_GENERATION),
                    )}
                    onItemSelected={(value) => {
                      dispatch({
                        type: 'SET_GENERATION_AT',
                        payload: parseInt(value),
                      });
                      toggleDropdown('generation');
                    }}
                  />
                )}
              </OptionTemplate>
            </>
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
              onChange={(e) =>
                dispatch({ type: 'SET_TITLE', payload: e.target.value })
              }
            />
          </OptionTemplate>
          <OptionTemplate title="알림 내용">
            <StTextArea
              placeholder="발송할 알림의 내용을 입력하세요."
              value={state.content}
              onChange={(e) =>
                dispatch({ type: 'SET_CONTENT', payload: e.target.value })
              }
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
          onClick={handleSubmit}
        />
      </ModalFooter>
    </StAlarmModalWrapper>
  );
};

export default CreateAlarmModal;
