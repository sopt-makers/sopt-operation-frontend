import {
  StDateWrapper,
  StInput,
  StInputBox,
  StInputLabel,
  StInputWrapper,
  StRadioBox,
  StRadioLabel,
  StRadioWrapper,
  StTitle,
  StTitleWrapper,
  StWrapper,
} from './style';

const RecruitSchedule = () => {
  return (
    <StWrapper>
      <StTitleWrapper>
        <StTitle>모집 일정</StTitle>
      </StTitleWrapper>
      <StInputWrapper>
        <StInputLabel>모집유형</StInputLabel>
        <StRadioWrapper>
          <StRadioBox>
            <StInput type="radio" name="group" id="ob" />
            <StRadioLabel>OB</StRadioLabel>
          </StRadioBox>
          <StRadioBox>
            <StInput type="radio" name="group" id="yb" />
            <StRadioLabel>YB</StRadioLabel>
          </StRadioBox>
        </StRadioWrapper>
      </StInputWrapper>
      <StDateWrapper>
        <StInputWrapper>
          <StInputBox>
            <StInputLabel>서류 접수 시작</StInputLabel>
            <StInput
              type="datetime-local"
              value={'2022-10-12T12:00'}
              hasValue={true}
            />
          </StInputBox>
          <StInputBox>
            <StInputLabel>서류 접수 마감</StInputLabel>
            <StInput type="datetime-local" hasValue={false} />
          </StInputBox>
          <StInputBox>
            <StInputLabel>서류 결과 발표</StInputLabel>
            <StInput type="datetime-local" hasValue={false} />
          </StInputBox>
        </StInputWrapper>
      </StDateWrapper>
      <StDateWrapper>
        <StInputWrapper>
          <StInputBox>
            <StInputLabel>면접 시작</StInputLabel>
            <StInput type="datetime-local" hasValue={false} />
          </StInputBox>
          <StInputBox>
            <StInputLabel>면접 마감</StInputLabel>
            <StInput type="datetime-local" hasValue={false} />
          </StInputBox>
        </StInputWrapper>
      </StDateWrapper>
      <StDateWrapper>
        <StInputWrapper>
          <StInputBox>
            <StInputLabel>최종 결과 발표</StInputLabel>
            <StInput type="datetime-local" hasValue={false} />
          </StInputBox>
        </StInputWrapper>
      </StDateWrapper>
    </StWrapper>
  );
};

export default RecruitSchedule;
