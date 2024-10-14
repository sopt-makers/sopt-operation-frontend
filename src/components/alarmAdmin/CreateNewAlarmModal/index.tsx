import 'react-datepicker/dist/react-datepicker.css';

import { Button, Chip, SelectV2, TextArea, TextField } from '@sopt-makers/ui';
import { ChangeEvent, useState } from 'react';
import DatePicker from 'react-datepicker';

import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';
import { createReserveAlarm, sendAlarm } from '@/services/api/alarm';
import { ACTIVITY_GENERATION } from '@/utils/generation';

import LabeledComponent from './LabeledComponent';
import {
  deepLinkOptions,
  partOptions,
  targetOptions,
  timeOptions,
} from './selectOptions';
import {
  AttachOptionButtonList,
  AttachWrapper,
  AvailableCheckLink,
  AvailableCheckText,
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
  StyledIconArrowUpRight,
  textAreaCSS,
} from './style';
import { AttachOptionType, SendPartType, SendTargetType } from './type';
import { linkTypeMap, partMap, targetTypeMap } from './utils';

interface Props {
  onClose: () => void;
  alarmId?: number;
  sendType: 'NOW' | 'RESERVE';
}

function CreateNewAlarmModal(props: Props) {
  const { onClose, alarmId, sendType } = props;

  const [selectedTarget, setSelectedTarget] =
    useState<SendTargetType>('활동 회원'); // 발송 대상
  const [selectedPart, setSelectedPart] = useState<SendPartType>(''); // 발송 파트
  const [alarmTitle, setAlarmTitle] = useState<string>(''); // 알림 제목
  const [alarmDetail, setAlarmDetail] = useState<string>(''); // 알림 내용
  const [attachOption, setAttachOption] =
    useState<AttachOptionType>('첨부 안함'); // 첨부 옵션
  const [webLink, setWebLink] = useState<string>(''); // 웹 링크
  const [deepLink, setDeepLink] = useState<string>(''); // 딥링크
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 예약 날짜(Date 객체)
  const [selectedTime, setSelectedTime] = useState<string>(''); // 예약 시간(HH:MM 포맷 string)
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false); // 달력 오픈 여부 관리하는 state

  const bannedTimeList = [
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
  ];

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
    // 여기 CSV 파일 업로드 관련 검증 로직 추가 필요

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

    // 예약 시간이 금지 시간대면 비활성화
    if (sendType === 'RESERVE' && bannedTimeList.includes(selectedTime))
      return true;

    return false;
  };

  const handleDatePickerToggle = () => {
    setDatePickerOpen(!datePickerOpen);
  };

  const handleChangeDate = (date: Date) => {
    setSelectedDate(date);
    setDatePickerOpen(false);
  };

  // 예약 날짜 포맷 변환 함수 (Date 객체에서 연월일 파싱해서 문자열로 반환)
  const formatDate = (date: Date | null) => {
    if (!date) return '알림 발송 날짜';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleClickAttachOptionButton = (option: AttachOptionType) => {
    setAttachOption(option);
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
      linkType: linkTypeMap[attachOption],
      link: 'https://www.linkedin.com/in/brokyeom/',
    };

    console.log(commonPayload);

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
  };

  return (
    <StAlarmModalWrapper>
      <ModalHeader title={modalTitle} desc={modalDesc} onClose={onClose} />
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
              {/* {여기에 CSV 파일 첨부 컴포넌트 추가} */}
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
                      open={datePickerOpen}
                      onSelect={handleDatePickerToggle}
                      customInput={<></>}
                    />
                  </SelectV2.Trigger>
                </SelectV2.Root>
              </div>
            </LabeledComponent>
            <LabeledComponent
              labelText="알림 발송 시간"
              desc="알림 발송 금지 시간: 00:00~07:30 / 21:30~23:30">
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
                    placeholder="발송 대상"
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
            <AvailableCheckLink>
              <StyledIconArrowUpRight />
              <AvailableCheckText>첨부 가능한 링크 확인하기</AvailableCheckText>
            </AvailableCheckLink>
            <AttachOptionButtonList>
              <Chip
                onClick={() => handleClickAttachOptionButton('첨부 안함')}
                active={attachOption === '첨부 안함'}>
                {'첨부 안함'}
              </Chip>
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
        <Button size="lg" type="button" onClick={onClose} theme="black">
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

export default CreateNewAlarmModal;
