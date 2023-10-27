import { useEffect, useState } from 'react';

import { IcNewDropdown, IcUpload } from '@/assets/icons';
import Button from '@/components/common/Button';
import DropDown from '@/components/common/DropDown';
import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';
import { postNewAlarm } from '@/services/api/alarm';
import { TARGET_GENERATION_LIST, TARGET_USER_LIST } from '@/utils/alarm';
import { partList, partTranslator } from '@/utils/session';

import {
  StAlarmModalWrapper,
  StAlarmTypeButton,
  StCsvUploader,
  StInput,
  StTargetUserSelector,
  StTextArea,
} from './style';

interface Props {
  onClose: () => void;
}

function CreateAlarmModal(props: Props) {
  const { onClose } = props;

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

  useEffect(() => {
    console.log(selectedValue);
  }, [selectedValue]);

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

  const handleSubmit = () => {
    let apiPartValue = selectedValue.part
      ? partTranslator[selectedValue.part]
      : null;
    let apiIsActive = selectedValue.isActive;

    if (isActiveUser === 'CSV첨부') {
      apiPartValue = null;
      apiIsActive = null;
    }

    let targetListValue = selectedValue.targetList;

    if (isActiveUser !== 'CSV 첨부') {
      targetListValue = null;
    }

    const payload = {
      ...selectedValue,
      part: apiPartValue,
      isActive: apiIsActive,
      targetList: targetListValue,
    };

    console.log(payload);

    postNewAlarm(payload);
    onClose();
  };

  const toggleDropdown = (type: AlarmDropdownType) => {
    setDropdownVisibility((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = function (evt) {
        const csv = evt.target?.result as string;
        const lines = csv.split('\n');
        const userIds: string[] = [];
        let foundColumn = false;

        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('[Amplitude] User ID')) {
            foundColumn = true;
            continue;
          }
          if (foundColumn) {
            let value = lines[i].split(',')[0].trim();
            value = value.replace(/^"\t|\t"$|"/g, '').trim();
            if (value) userIds.push(value);
          }
        }
        setUploadedFile(file);
        setSelectedValue((prev) => ({ ...prev, targetList: userIds }));
      };
    }
  };

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
            onClick={() => {
              setSelectedValue((prev) => ({
                ...prev,
                attribute: 'NOTICE',
              }));
              setSelectedAlarmType({ notice: true, news: false });
            }}
            isSelected={selectedAlarmType.notice}>
            공지
          </StAlarmTypeButton>
          <StAlarmTypeButton
            type="button"
            onClick={() => {
              setSelectedValue((prev) => ({
                ...prev,
                attribute: 'NEWS',
              }));
              setSelectedAlarmType({ notice: false, news: true });
            }}
            isSelected={selectedAlarmType.news}>
            소식
          </StAlarmTypeButton>
        </div>
        <div className="dropdowns title">
          <div>
            <p>발송 대상</p>
            <StTargetUserSelector onClick={() => toggleDropdown('target')}>
              {isActiveUser}
              <IcNewDropdown />
            </StTargetUserSelector>
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
          </div>
          {isActiveUser !== 'CSV 첨부' && (
            <>
              <div>
                <p>파트</p>
                <StTargetUserSelector onClick={() => toggleDropdown('part')}>
                  {selectedValue.part}
                  <IcNewDropdown />
                </StTargetUserSelector>
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
              </div>
              <div>
                <p>발송 기수</p>
                <StTargetUserSelector
                  onClick={() => toggleDropdown('generation')}>
                  {selectedValue.generation}기
                  <IcNewDropdown />
                </StTargetUserSelector>
                {dropdownVisibility.generation && (
                  <DropDown
                    type={'select'}
                    list={TARGET_GENERATION_LIST}
                    onItemSelected={(value) => {
                      setSelectedValue((prev) => ({
                        ...prev,
                        selectedGeneration: value,
                      }));
                      toggleDropdown('generation');
                    }}
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div className="inputs title">
          {isActiveUser === 'CSV 첨부' && (
            <div>
              <p>CSV 파일 첨부</p>
              <input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                style={{ display: 'none' }}
                id="csvUploaderInput"
              />
              <StCsvUploader
                onClick={() =>
                  document.getElementById('csvUploaderInput')?.click()
                }>
                {uploadedFile ? (
                  uploadedFile.name
                ) : (
                  <>
                    <IcUpload />
                    눌러서 첨부하기
                  </>
                )}
              </StCsvUploader>
            </div>
          )}
          <div>
            <p>알림 제목</p>
            <StInput
              type="text"
              placeholder="발송할 알림의 제목을 입력하세요."
              onChange={(e) => {
                setSelectedValue((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
          </div>
          <div>
            <p>알림 내용</p>
            <StTextArea
              placeholder="발송할 알림의 내용을 입력하세요."
              onChange={(e) => {
                setSelectedValue((prev) => ({
                  ...prev,
                  content: e.target.value,
                }));
              }}
            />
          </div>
          <div>
            <p>링크 첨부</p>
            <StTargetUserSelector onClick={() => alert('개발중이에요 ㅠ')}>
              개발중이에요 ㅠ
              <IcNewDropdown />
            </StTargetUserSelector>
          </div>
        </div>
      </main>
      <ModalFooter>
        <Button type={'button'} text="취소하기" onClick={onClose} />
        <Button
          type={'submit'}
          text="알림 생성하기"
          disabled={false}
          onClick={() => handleSubmit()}
        />
      </ModalFooter>
    </StAlarmModalWrapper>
  );
}

export default CreateAlarmModal;
