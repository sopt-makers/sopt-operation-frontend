import 'react-datepicker/dist/react-datepicker.css';

import { IconLink, IconXClose } from '@sopt-makers/icons';
import { Button, Chip, SelectV2, TextArea, TextField } from '@sopt-makers/ui';
import { ChangeEvent, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';
import { createReserveAlarm, sendAlarm } from '@/services/api/alarm';
import { readPlaygroundId } from '@/utils/alarm';
import { ACTIVITY_GENERATION } from '@/utils/generation';

import LabeledComponent from './LabeledComponent';
import {
  AttachOptionButtonList,
  AttachWrapper,
  datePickerWrapperCSS,
  deepLinkSelectCSS,
  deepLinkTriggerCSS,
  inputCSS,
  InputWrapper,
  OptionalInputWrapper,
  reserveDateSelectCSS,
  reserveDateTriggerCSS,
  reserveTimeSelectCSS,
  reserveTimeTriggerCSS,
  SelectWrapper,
  sendSelectCSS,
  SendTimeWrapper,
  sendTriggerCSS,
  StAlarmModalWrapper,
  StCsvUploader,
  StyledIconArrowUpRight,
  textAreaCSS,
} from './style';
import { AttachOptionType, SendPartType, SendTargetType } from './type';
import {
  bannedTimeList,
  deepLinkOptions,
  formatDate,
  linkTypeMap,
  partMap,
  partOptions,
  targetOptions,
  targetTypeMap,
  timeOptions,
} from './utils';

interface Props {
  onClose: () => void;
  alarmId?: number;
  sendType: 'NOW' | 'RESERVE';
}

function CreateAlarmModal(props: Props) {
  const { onClose, alarmId, sendType } = props;

  const [selectedTarget, setSelectedTarget] =
    useState<SendTargetType>('활동 회원'); // 발송 대상
  const [selectedPart, setSelectedPart] = useState<SendPartType>(''); // 발송 파트
  const [alarmTitle, setAlarmTitle] = useState<string>(''); // 알림 제목
  const [alarmDetail, setAlarmDetail] = useState<string>(''); // 알림 내용
  const [attachOption, setAttachOption] = useState<AttachOptionType>('웹 링크'); // 첨부 옵션
  const [webLink, setWebLink] = useState<string>(''); // 웹 링크
  const [deepLink, setDeepLink] = useState<string>(''); // 딥링크
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 예약 날짜(Date 객체)
  const [selectedTime, setSelectedTime] = useState<string>(''); // 예약 시간(HH:MM 포맷 string)
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false); // 달력 오픈 여부 관리하는 state

  const throttleRef = useRef(false);

  const [targetList, setTargetList] = useState<Array<string>>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // CSV 파일을 관리하는 state

  const modalTitle = sendType === 'NOW' ? '알림 즉시 발송' : '알림 예약 발송';
  const modalDesc =
    sendType === 'NOW'
      ? 'APP으로 알림을 즉시 발송합니다.'
      : 'APP으로 발송할 알림의 날짜와 시간을 예약합니다.';

  const sendButtonText = sendType === 'NOW' ? '알림 발송하기' : '알림 예약하기';

  const handleChangeTargetSelect = (value: SendTargetType) => {
    setSelectedTarget(value);
  };

  const handleChangePartSelect = (value: SendPartType) => {
    setSelectedPart(value);
  };

  const handleChangeAlarmTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setAlarmTitle(e.target.value);
  };

  const handleChangeAlarmDetail = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAlarmDetail(e.target.value);
  };

  const handleChangeWebLink = (e: ChangeEvent<HTMLInputElement>) => {
    setWebLink(e.target.value);
  };

  const handleChangeDeepLinkSelect = (value: string) => {
    setDeepLink(value);
  };

  const handleChangeSelectedTime = (value: string) => {
    setSelectedTime(value);
  };

  // 발송하기 버튼 활성화 검증 로직 함수
  const checkDisabled = () => {
    // 활동 회원 선택했는데 파트를 선택 안 하면 비활성화
    if (selectedTarget === '활동 회원' && selectedPart === '') return true;
    // 알림 제목 안 적으면 비활성화
    if (alarmTitle.trim().length === 0) return true;
    // 알림 내용 안 적으면 비활성화
    if (alarmDetail.trim().length === 0) return true;
    // 웹 링크 선택하고 링크 입력 안 하면 비활성화
    if (attachOption === '웹 링크' && webLink.trim().length === 0) return true;
    // 앱 내 딥링크 선택하고 딥링크 안 고르면 비활성화
    if (attachOption === '앱 내 딥링크' && deepLink === '') return true;

    // 예약 발송인데 예약 날짜 안 고르면 비활성화
    if (sendType === 'RESERVE' && selectedDate === null) return true;

    // 예약 발송인데 예약 시간 안 고르면 비활성화
    if (sendType === 'RESERVE' && selectedTime === '') return true;

    if (selectedTarget === 'CSV 첨부' && targetList.length === 0) return true;

    return false;
  };

  const handleDatePickerToggle = () => {
    setDatePickerOpen(!datePickerOpen);
  };

  const handleChangeDate = (date: Date) => {
    setSelectedDate(date);
    setDatePickerOpen(false);
  };

  const handleClickAttachOptionButton = (option: AttachOptionType) => {
    setAttachOption(option);
  };

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const userIds = await readPlaygroundId(file);
        setUploadedFile(file);
        setTargetList(userIds);
      } catch (error) {
        console.error('파일을 읽는데 실패했습니다.', error);
        setUploadedFile(null);
        setTargetList([]);
        if (e.target) {
          e.target.value = '';
        }
      }
    }
  };

  const handleClickCancelButton = () => {
    if (
      confirm(
        '알림 생성 모달을 종료하면 작성된 내용이 모두 사라져요.\n그래도 삭제하시겠어요?',
      )
    ) {
      onClose();
    }
  };

  // 발송 / 예약하기 버튼 눌렀을 때 API 요청 쏘는 함수
  const handleClickCompleteButton = async () => {
    const commonPayload: AlarmData = {
      createdGeneration: parseInt(ACTIVITY_GENERATION),
      targetType: targetTypeMap[selectedTarget],
      part: partMap[selectedPart],
      category: 'NOTICE',
      title: alarmTitle,
      content: alarmDetail,
      targetList: targetList,
      linkType: linkTypeMap[attachOption],
      link: attachOption === '웹 링크' ? webLink : deepLink,
    };

    if (throttleRef.current) return;

    throttleRef.current = true;

    try {
      switch (sendType) {
        case 'NOW':
          await sendAlarm(commonPayload);
          break;

        case 'RESERVE':
          const reservePayload: ReserveAlarmData = {
            ...commonPayload,
            postDate: formatDate(selectedDate),
            postTime: selectedTime,
          };

          await createReserveAlarm(reservePayload);
          break;
      }
    } catch (e) {
      console.log(e);
    } finally {
      throttleRef.current = false;
    }

    onClose();
  };

  return (
    <StAlarmModalWrapper>
      <ModalHeader
        title={modalTitle}
        desc={modalDesc}
        onClose={handleClickCancelButton}
      />
      <main>
        <SelectWrapper>
          <LabeledComponent labelText="발송 대상">
            <SelectV2.Root
              css={sendSelectCSS}
              onChange={handleChangeTargetSelect}
              defaultValue={targetOptions[0]}
              type="text">
              <SelectV2.Trigger>
                <SelectV2.TriggerContent css={sendTriggerCSS} />
              </SelectV2.Trigger>
              <SelectV2.Menu>
                {targetOptions.map((option) => (
                  <SelectV2.MenuItem key={option.value} option={option} />
                ))}
              </SelectV2.Menu>
            </SelectV2.Root>
          </LabeledComponent>
          {selectedTarget === '활동 회원' && (
            <LabeledComponent labelText="발송 파트">
              <SelectV2.Root
                css={sendSelectCSS}
                onChange={handleChangePartSelect}
                type="text">
                <SelectV2.Trigger>
                  <SelectV2.TriggerContent
                    css={sendTriggerCSS}
                    placeholder="발송 파트"
                  />
                </SelectV2.Trigger>
                <SelectV2.Menu>
                  {partOptions.map((option) => (
                    <SelectV2.MenuItem key={option.value} option={option} />
                  ))}
                </SelectV2.Menu>
              </SelectV2.Root>
            </LabeledComponent>
          )}
        </SelectWrapper>
        <InputWrapper>
          {selectedTarget === 'CSV 첨부' && (
            <LabeledComponent labelText="CSV 파일 첨부">
              <StCsvUploader>
                {uploadedFile ? (
                  <div className="uploaded">
                    <span>{uploadedFile.name}</span>
                    <Button
                      onClick={() => setUploadedFile(null)}
                      theme="black"
                      size="sm"
                      css={{
                        padding: '6px',
                        '& > span': {
                          width: '16px',
                          height: '16px',
                        },
                      }}>
                      <IconXClose style={{ width: '16px', height: '16px' }} />
                    </Button>
                  </div>
                ) : (
                  <>
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
                      눌러서 CSV 파일 첨부하기
                    </div>
                    <IconLink style={{ width: '24px', height: '24px' }} />
                  </>
                )}
              </StCsvUploader>
            </LabeledComponent>
          )}
          <TextField
            css={inputCSS}
            value={alarmTitle}
            onChange={handleChangeAlarmTitle}
            labelText="알림 제목"
            placeholder="발송할 알림의 제목을 입력하세요."
            required
          />
          <LabeledComponent labelText="알림 내용">
            <TextArea
              css={textAreaCSS}
              fixedHeight={106}
              value={alarmDetail}
              onChange={handleChangeAlarmDetail}
              placeholder="발송할 알림의 내용을 입력하세요."
              required
            />
          </LabeledComponent>
        </InputWrapper>
        {sendType === 'RESERVE' && (
          <SendTimeWrapper>
            <LabeledComponent
              labelText="알림 발송 날짜"
              desc="이미 지나간 날짜는 선택되지 않아요.">
              <div onClick={handleDatePickerToggle} css={datePickerWrapperCSS}>
                <SelectV2.Root css={reserveDateSelectCSS} type="text">
                  <SelectV2.Trigger>
                    <SelectV2.TriggerContent
                      css={reserveDateTriggerCSS(selectedDate)}
                      placeholder={formatDate(selectedDate)}
                    />
                  </SelectV2.Trigger>
                  <SelectV2.Trigger>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleChangeDate}
                      minDate={new Date()}
                      open={datePickerOpen}
                      onSelect={handleDatePickerToggle}
                      customInput={<></>}
                    />
                  </SelectV2.Trigger>
                </SelectV2.Root>
              </div>
            </LabeledComponent>
            <LabeledComponent
              labelText="알림 유의 시간"
              desc="알림 유의 시간: 00:00~07:30 / 21:30~23:30">
              <SelectV2.Root
                css={reserveTimeSelectCSS(
                  bannedTimeList.includes(selectedTime),
                )}
                visibleOptions={5}
                onChange={handleChangeSelectedTime}
                type="text">
                <SelectV2.Trigger>
                  <SelectV2.TriggerContent
                    css={reserveTimeTriggerCSS(
                      bannedTimeList.includes(selectedTime),
                    )}
                    placeholder="시간 선택"
                  />
                </SelectV2.Trigger>
                <SelectV2.Menu>
                  {timeOptions.map((option) => (
                    <SelectV2.MenuItem key={option.value} option={option} />
                  ))}
                </SelectV2.Menu>
              </SelectV2.Root>
            </LabeledComponent>
          </SendTimeWrapper>
        )}
        <AttachWrapper>
          <LabeledComponent labelText="링크 첨부">
            <AttachOptionButtonList>
              <Chip
                onClick={() => handleClickAttachOptionButton('웹 링크')}
                active={attachOption === '웹 링크'}>
                {'웹 링크'}
              </Chip>
              <Chip
                onClick={() => handleClickAttachOptionButton('앱 내 딥링크')}
                active={attachOption === '앱 내 딥링크'}>
                {'앱 내 딥 링크'}
              </Chip>
            </AttachOptionButtonList>
            <OptionalInputWrapper attachOption={attachOption}>
              {attachOption === '웹 링크' && (
                <TextField
                  value={webLink}
                  onChange={handleChangeWebLink}
                  css={inputCSS}
                  placeholder="이동할 링크를 입력하세요."
                />
              )}
              {attachOption === '앱 내 딥링크' && (
                <SelectV2.Root
                  visibleOptions={4}
                  css={deepLinkSelectCSS}
                  onChange={handleChangeDeepLinkSelect}
                  type="text">
                  <SelectV2.Trigger>
                    <SelectV2.TriggerContent
                      css={deepLinkTriggerCSS}
                      placeholder="이동할 링크를 선택하세요."
                    />
                  </SelectV2.Trigger>
                  <SelectV2.Menu>
                    {deepLinkOptions.map((option) => (
                      <SelectV2.MenuItem key={option.value} option={option} />
                    ))}
                  </SelectV2.Menu>
                </SelectV2.Root>
              )}
            </OptionalInputWrapper>
          </LabeledComponent>
        </AttachWrapper>
      </main>
      <ModalFooter>
        <Button
          size="lg"
          type="button"
          onClick={handleClickCancelButton}
          theme="black">
          취소하기
        </Button>
        <Button
          size="lg"
          type="submit"
          disabled={checkDisabled()}
          onClick={handleClickCompleteButton}>
          {sendButtonText}
        </Button>
      </ModalFooter>
    </StAlarmModalWrapper>
  );
}

export default CreateAlarmModal;
