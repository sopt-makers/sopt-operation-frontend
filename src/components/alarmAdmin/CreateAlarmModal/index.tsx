import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

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

function CreateAlarmModal(props: Props) {
  const { onClose, alarmId } = props;

  const [selectedValue, setSelectedValue] = useState<PostAlarmData>({
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

  const handleSubmit = async () => {
    setIsSubmitting(true);

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
            <>
              <OptionTemplate title="파트">
                <Selector
                  content={selectedValue.part}
                  onClick={() => toggleDropdown('part')}
                  isDisabledValue={selectedValue.part === '발송 파트'}
                />
                {dropdownVisibility.part && (
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
                  content={`${selectedValue.generationAt}기`}
                  onClick={() => toggleDropdown('generation')}
                  isDisabledValue={selectedValue.isActive == true}
                />
                {dropdownVisibility.generation && !selectedValue.isActive && (
                  <DropDown
                    type={'select'}
                    list={TARGET_GENERATION_LIST.filter(
                      (item) => !item.includes(ACTIVITY_GENERATION),
                    )}
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
