import { useEffect, useState } from 'react';

import { IcDeleteFile, IcUpload } from '@/assets/icons';
import Button from '@/components/common/Button';
import DropDown from '@/components/common/DropDown';
import Input from '@/components/common/Input';
import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';
import OptionTemplate from '@/components/common/OptionTemplate';
import Selector from '@/components/common/Selector';
import { deleteAlarm, getAlarm, postNewAlarm } from '@/services/api/alarm';
import {
  readPlaygroundId,
  TARGET_GENERATION_LIST,
  TARGET_USER_LIST,
} from '@/utils/alarm';
import { partList, partTranslator } from '@/utils/session';

import {
  StAlarmModalWrapper,
  StAlarmTypeButton,
  StCsvUploader,
  StTextArea,
} from './style';

interface Props {
  onClose: () => void;
  readOnly?: boolean;
  alarmId?: number;
}

function CreateAlarmModal(props: Props) {
  const { onClose, readOnly = false, alarmId } = props;

  const [selectedValue, setSelectedValue] = useState<PostAlarmData>({
    attribute: 'NOTICE',
    part: '발송 파트',
    isActive: true,
    generation: 33,
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
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (isActiveUser === '활동 회원') {
      setSelectedValue((prev) => ({ ...prev, isActive: true }));
    } else {
      setSelectedValue((prev) => ({ ...prev, isActive: false }));
    }
    if (isActiveUser === '특정 유저 지정') {
      setSelectedValue((prev) => ({
        ...prev,
        part: '발송 파트',
        isActive: null,
      }));
    }
  }, [isActiveUser]);

  useEffect(() => {
    if (
      (selectedValue.part !== '발송 파트' &&
        selectedValue.title !== '' &&
        selectedValue.content !== '') ||
      (uploadedFile !== null &&
        isActiveUser === 'CSV 첨부' &&
        selectedValue.content !== '' &&
        selectedValue.title !== '')
    ) {
      setIsReadyToSubmit(false);
    } else {
      setIsReadyToSubmit(true);
    }
  }, [
    isActiveUser,
    selectedValue.content,
    selectedValue.part,
    selectedValue.title,
    uploadedFile,
  ]);

  useEffect(() => {
    if (readOnly && alarmId) {
      (async () => {
        const alarmData = await getAlarm(alarmId);
        setSelectedValue({
          ...alarmData,
          generation: 33,
          targetList: null,
          part: alarmData.part ?? '전체',
        });
        setIsSent(!!alarmData.sentAt);
        setIsActiveUser(getActiveUser(alarmData.isActive));
      })();
    }
  }, [readOnly, alarmId]);

  const getActiveUser = (isActive: boolean | null) => {
    if (isActive) {
      return '활동 회원';
    } else if (isActive === null) {
      return '명예 회원';
    } else {
      return 'CSV 첨부';
    }
  };

  const handleSubmit = () => {
    let apiPartValue = selectedValue.part
      ? partTranslator[selectedValue.part]
      : null;
    let apiIsActive = selectedValue.isActive;
    let targetListValue = selectedValue.targetList;

    if (isActiveUser === 'CSV 첨부') {
      apiPartValue = null;
      apiIsActive = null;
    }

    if (isActiveUser !== 'CSV 첨부') {
      targetListValue = null;
    }

    const payload = {
      ...selectedValue,
      part: apiPartValue,
      isActive: apiIsActive,
      targetList: targetListValue,
    };
    postNewAlarm(payload);
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
        setSelectedValue((prev) => ({ ...prev, targetList: userIds }));
      } catch (error) {
        console.error('파일을 읽는데 실패했습니다.', error);
      }
    }
  };

  const handleAlarmType = (type: string): void => {
    if (type === 'NOTICE') {
      setSelectedValue((prev) => ({
        ...prev,
        attribute: 'NOTICE',
      }));
      setSelectedAlarmType({ notice: true, news: false });
    }
    if (type === 'NEWS') {
      setSelectedValue((prev) => ({
        ...prev,
        attribute: 'NEWS',
      }));
      setSelectedAlarmType({ notice: false, news: true });
    }
  };

  const onDeleteAlarm = async () => {
    if (alarmId) {
      const response = window.confirm('알림을 삭제하시겠습니까?');
      if (response) {
        const result = await deleteAlarm(alarmId);
        window.alert(result ? '삭제 완료되었습니다' : '삭제 실패했습니다');
      }
    }
  };

  return (
    <StAlarmModalWrapper>
      <ModalHeader
        title={readOnly ? '알림 조회' : '알림 생성'}
        desc={readOnly ? '' : 'APP으로 발송할 알림을 생성합니다.'}
        onClose={onClose}
      />
      <main>
        <div className="type_selector">
          <StAlarmTypeButton
            type="button"
            onClick={() => !readOnly && handleAlarmType('NOTICE')}
            isSelected={selectedAlarmType.notice}
            readOnly={readOnly}>
            공지
          </StAlarmTypeButton>
          <StAlarmTypeButton
            type="button"
            onClick={() => !readOnly && handleAlarmType('NEWS')}
            isSelected={selectedAlarmType.news}
            readOnly={readOnly}>
            소식
          </StAlarmTypeButton>
        </div>
        <div className="dropdowns">
          <OptionTemplate title="발송 대상">
            <Selector
              content={isActiveUser}
              onClick={() => toggleDropdown('target')}
              isDisabledValue={false}
            />
            {dropdownVisibility.target && !readOnly && (
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
            <>
              <OptionTemplate title="파트">
                <Selector
                  content={selectedValue.part}
                  onClick={() => toggleDropdown('part')}
                  isDisabledValue={selectedValue.part === '발송 파트'}
                />
                {dropdownVisibility.part && !readOnly && (
                  <DropDown
                    type={'select'}
                    list={partList}
                    onItemSelected={(value) => {
                      setSelectedValue((prev) => ({
                        ...prev,
                        part: value,
                      }));
                      toggleDropdown('part');
                    }}
                  />
                )}
              </OptionTemplate>
              <OptionTemplate title="발송 기수">
                <Selector
                  content={`${selectedValue.generation}기`}
                  onClick={() => toggleDropdown('generation')}
                  isDisabledValue={selectedValue.isActive == true}
                />
                {dropdownVisibility.generation &&
                  !selectedValue.isActive &&
                  !readOnly && (
                    <DropDown
                      type={'select'}
                      list={TARGET_GENERATION_LIST}
                      onItemSelected={(value) => {
                        setSelectedValue((prev) => ({
                          ...prev,
                          generation: parseInt(value),
                        }));
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
              readOnly={readOnly}
              type="text"
              placeholder="발송할 알림의 제목을 입력하세요."
              value={selectedValue.title}
              onChange={(e) => {
                setSelectedValue((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
          </OptionTemplate>
          <OptionTemplate title="알림 내용">
            <StTextArea
              readOnly={readOnly}
              placeholder="발송할 알림의 내용을 입력하세요."
              value={selectedValue.content}
              onChange={(e) => {
                setSelectedValue((prev) => ({
                  ...prev,
                  content: e.target.value,
                }));
              }}
            />
          </OptionTemplate>
          <OptionTemplate title="링크 첨부">
            <Selector content="기능 추가 예정입니다." isDisabledValue={true} />
          </OptionTemplate>
        </div>
      </main>
      <ModalFooter>
        {readOnly && !isSent ? (
          <Button type="button" text="삭제하기" onClick={onDeleteAlarm} />
        ) : (
          <Button type={'button'} text="취소하기" onClick={onClose} />
        )}
        {!readOnly && (
          <Button
            type={'submit'}
            text="알림 생성하기"
            disabled={isReadyToSubmit}
            onClick={() => handleSubmit()}
          />
        )}
      </ModalFooter>
    </StAlarmModalWrapper>
  );
}

export default CreateAlarmModal;
