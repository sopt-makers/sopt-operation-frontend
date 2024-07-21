import { colors } from '@sopt-makers/colors';
import { IconAttachment, IconXClose } from '@sopt-makers/icons';
import { Button as MDSButton, Chip, TextField } from '@sopt-makers/ui';
import { ReactNode, useEffect, useState } from 'react';
import { ImmerReducer, useImmerReducer } from 'use-immer';

import Loading from '@/components/common/Loading';
import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';
import { postNewAlarm } from '@/services/api/alarm';
import { readPlaygroundId, TARGET_GENERATION_LIST } from '@/utils/alarm';
import { partList, partTranslator } from '@/utils/session';

import {
  fileUploaderCss,
  LinkChipsCss,
  StAlarmModalWrapper,
  StLabel,
  StSelect,
  StTextField,
  textAreaCss,
} from './style';

interface Props {
  sendType: ALARM_SEND_TYPE;
  onClose: () => void;
  alarmId?: number;
}

type Action =
  | { type: 'SET_TARGET'; payload: '활동 회원' | 'CSV 첨부' }
  | { type: 'SET_PART'; payload: string }
  | { type: 'TOGGLE_ACTIVE'; payload?: boolean | null }
  | { type: 'SET_TARGET_LIST'; payload: string[] | null }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'SET_LINK_TYPE'; payload: '첨부 안함' | '웹링크' | '앱 내 딥링크' }
  | { type: 'SET_LINK'; payload: string | null };

const reducer: ImmerReducer<PostAlarmData, Action> = (draft, action) => {
  switch (action.type) {
    case 'SET_TARGET':
      draft.target = action.payload;
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
    case 'SET_LINK_TYPE':
      draft.linkType = action.payload;
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

const linkTypes: PostAlarmData['linkType'][] = [
  '첨부 안함',
  '웹링크',
  '앱 내 딥링크',
];

const CreateAlarmModal = ({ onClose, alarmId }: Props) => {
  const [state, dispatch] = useImmerReducer(reducer, {
    target: '활동 회원',
    part: '전체',
    isActive: true,
    targetList: null,
    title: '',
    content: '',
    linkType: '첨부 안함',
    link: null,
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (
      (state.part !== '발송 파트' &&
        state.title !== '' &&
        state.content !== '') ||
      (uploadedFile !== null &&
        state.target === 'CSV 첨부' &&
        state.content !== '' &&
        state.title !== '')
    ) {
      setIsReadyToSubmit(false);
    } else {
      setIsReadyToSubmit(true);
    }
  }, [state.content, state.part, state.target, state.title, uploadedFile]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    let apiPartValue = state.part ? partTranslator[state.part] : null;
    let apiIsActive = state.isActive;
    let targetListValue = state.targetList;

    if (state.target === 'CSV 첨부') {
      apiPartValue = null;
    }

    if (state.target !== 'CSV 첨부') {
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
              defaultValue={state.target}
              options={TARGET_USER_LIST}
              onChange={(value) => {
                dispatch({ type: 'SET_TARGET', payload: value });
              }}
            />
          </div>
          {state.target !== 'CSV 첨부' && (
            <div css={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Label>발송 파트</Label>
              <StSelect
                type="text"
                defaultValue={state.part ?? '발송 파트'}
                options={PART_LIST}
                onChange={(value) => {
                  dispatch({ type: 'SET_PART', payload: value });
                }}
              />
            </div>
          )}
        </section>
        {state.target === 'CSV 첨부' &&
          (uploadedFile ? (
            <div css={fileUploaderCss}>
              <span>{uploadedFile.name}</span>
              <IconXClose
                onClick={() => setUploadedFile(null)}
                css={{ height: '24px', width: '24px' }}
              />
            </div>
          ) : (
            <div
              css={fileUploaderCss}
              onClick={() =>
                document.getElementById('csvUploaderInput')?.click()
              }>
              <span>눌러서 CSV 파일 첨부하기</span>
              <IconAttachment css={{ height: '24px', width: '24px' }} />
              <input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                style={{ display: 'none' }}
                id="csvUploaderInput"
              />
            </div>
          ))}
        <StTextField
          placeholder="발송할 알림의 제목을 입력하세요."
          labelText="알림 제목"
          value={state.title}
          onChange={(e) =>
            dispatch({ type: 'SET_TITLE', payload: e.target.value })
          }
          required
        />
        <div css={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Label>알림 내용</Label>
          <textarea
            placeholder="발송할 알림의 내용을 입력하세요."
            value={state.content}
            onChange={(e) =>
              dispatch({ type: 'SET_CONTENT', payload: e.target.value })
            }
            required
            css={textAreaCss}
          />
        </div>
        <Label>링크 첨부</Label>
        {/* <p
          css={{
            color: colors.gray100,
            ...fontsObject.LABEL_5_11_SB,
            textDecoration: 'underline',
          }}>
          첨부 가능한 링크 확인하기
        </p> */}
        <div css={LinkChipsCss}>
          {linkTypes.map((label) => (
            <Chip
              key={label}
              onClick={() =>
                dispatch({ type: 'SET_LINK_TYPE', payload: label })
              }
              size="sm"
              active={state.linkType === label}>
              {label}
            </Chip>
          ))}
        </div>
        {state.linkType === '웹링크' && (
          <TextField
            placeholder="이동할 링크를 입력하세요."
            value={state.link ?? ''}
            onChange={(e) =>
              dispatch({ type: 'SET_LINK', payload: e.target.value })
            }
            css={{ '& > div > input': { backgroundColor: colors.gray700 } }}
          />
        )}
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
