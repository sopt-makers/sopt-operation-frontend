import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { Button as MDSButton, Chip } from '@sopt-makers/ui';
import { Draft } from 'immer';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useImmerReducer } from 'use-immer';

import { IcDeleteFile, IcUpload } from '@/assets/icons';
import Loading from '@/components/common/Loading';
import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';
import OptionTemplate from '@/components/common/OptionTemplate';
import { postNewAlarm } from '@/services/api/alarm';
import { readPlaygroundId, TARGET_GENERATION_LIST } from '@/utils/alarm';
import { partList, partTranslator } from '@/utils/session';

import {
  LinkChipsCss,
  StAlarmModalWrapper,
  StCsvUploader,
  StLabel,
  StSelect,
  StTextArea,
  StTextField,
} from './style';

interface Props {
  onClose: () => void;
  alarmId?: number;
}

type Action =
  | { type: 'SET_ATTRIBUTE'; payload: string }
  | { type: 'SET_PART'; payload: string }
  | { type: 'TOGGLE_ACTIVE'; payload?: boolean | null }
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

const TARGET_USER_LIST = [
  { label: '활동 회원', value: '활동 회원' },
  { label: 'CSV 첨부', value: 'CSV 첨부' },
];

export const PART_LIST = [
  { label: '전체', value: '전체' },
  { label: '기획', value: '기획' },
  { label: '디자인', value: '디자인' },
  { label: '서버', value: '서버' },
  { label: 'iOS', value: 'iOS' },
  { label: '안드로이드', value: '안드로이드' },
  { label: '웹', value: '웹' },
];

const LINK_TYPE = ['첨부 안함', '웹링크', '앱 내 딥링크'];

const CreateAlarmModal = ({ onClose, alarmId }: Props) => {
  const [state, dispatch] = useImmerReducer(reducer, {
    attribute: 'NOTICE',
    part: '발송 파트',
    isActive: true,
    targetList: null,
    title: '',
    content: '',
    link: null,
  });

  const [isActiveUser, setIsActiveUser] = useState<string>('활동 회원');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(true);
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
      part: apiPartValue,
      isActive: apiIsActive,
      targetList: targetListValue,
    };

    console.log(payload);
    // await postNewAlarm(payload);
    setIsSubmitting(false);
    // onClose();
  };

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const userIds = await readPlaygroundId(file);
        setUploadedFile(file);
        dispatch({ type: 'SET_TARGET_LIST', payload: userIds });
      } catch (error) {
        alert('파일을 읽는데 실패했습니다.');
      }
    }
  };

  const Label = ({ children }: { children: ReactNode }) => (
    <StLabel>
      {children}
      <span className="required">*</span>
    </StLabel>
  );

  if (isSubmitting) return <Loading />;
  return (
    <StAlarmModalWrapper>
      <ModalHeader
        title="알림 즉시 발송"
        onClose={onClose}
        desc="APP으로 알림을 즉시 발송합니다."
      />
      <main>
        <section css={{ display: 'flex', gap: 20 }}>
          <div css={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Label>발송 대상</Label>
            <StSelect
              type="text"
              defaultValue={'활동 회원'}
              options={TARGET_USER_LIST}
              onChange={(value) => {
                console.log(value);
                dispatch({ type: 'SET_ATTRIBUTE', payload: value });
              }}
            />
          </div>
          {isActiveUser !== 'CSV 첨부' && (
            <div css={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Label>발송 파트</Label>
              <StSelect
                type="text"
                defaultValue={'전체'}
                options={PART_LIST}
                onChange={(value) => {
                  dispatch({ type: 'SET_PART', payload: value });
                }}
              />
            </div>
          )}
        </section>
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
        <StTextField
          placeholder="발송할 알림의 제목을 입력하세요."
          labelText="알림 제목"
          value={state.title}
          onChange={(e) =>
            dispatch({ type: 'SET_TITLE', payload: e.target.value })
          }
          required
        />
        <StTextArea
          placeholder="발송할 알림의 내용을 입력하세요."
          labelText="알림 내용"
          value={state.content}
          onChange={(e) =>
            dispatch({ type: 'SET_CONTENT', payload: e.target.value })
          }
          required
          maxLength={0}
          onSubmit={function (): void {
            console.log('입력완료');
          }}
        />
        <Label>링크 첨부</Label>
        <p css={{ color: colors.gray100 }}>첨부 가능한 링크 확인하기</p>
        <div css={LinkChipsCss}>
          {LINK_TYPE.map((label) => (
            <Chip key={label} size="sm">
              {label}
            </Chip>
          ))}
        </div>
      </main>
      <ModalFooter>
        <MDSButton size="lg" theme="black" onClick={onClose}>
          취소하기
        </MDSButton>
        <MDSButton
          type={'submit'}
          size="lg"
          disabled={isReadyToSubmit}
          onClick={handleSubmit}>
          알림 생성하기
        </MDSButton>
      </ModalFooter>
    </StAlarmModalWrapper>
  );
};

export default CreateAlarmModal;
