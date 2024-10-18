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
            <input type="radio" name="group" id="ob" />
            <StRadioLabel>OB</StRadioLabel>
          </StRadioBox>
          <StRadioBox>
            <input type="radio" name="group" id="yb" />
            <StRadioLabel>YB</StRadioLabel>
          </StRadioBox>
        </StRadioWrapper>
      </StInputWrapper>
      <StDateWrapper>
        <StInputWrapper>
          <StInputBox>
            <StInputLabel htmlFor="application-start">
              서류 접수 시작
            </StInputLabel>
            <StInput
              id="application-start"
              type="datetime-local"
              value={'2022-10-12T12:00'}
              hasValue={true}
            />
          </StInputBox>
          <StInputBox>
            <StInputLabel htmlFor="application-end">
              서류 접수 마감
            </StInputLabel>
            <StInput
              value={'2022-10-12T12:00'}
              id="application-end"
              type="datetime-local"
              hasValue={false}
            />
          </StInputBox>
          <StInputBox>
            <StInputLabel htmlFor="application-result">
              서류 결과 발표
            </StInputLabel>
            <StInput
              value={'2022-10-12T12:00'}
              id="application-result"
              type="datetime-local"
              hasValue={false}
            />
          </StInputBox>
        </StInputWrapper>
      </StDateWrapper>
      <StDateWrapper>
        <StInputWrapper>
          <StInputBox>
            <StInputLabel htmlFor="interview-start">면접 시작</StInputLabel>
            <StInput
              value={'2022-10-12T12:00'}
              id="interview-start"
              type="datetime-local"
              hasValue={false}
            />
          </StInputBox>
          <StInputBox>
            <StInputLabel htmlFor="interview-end">면접 마감</StInputLabel>
            <StInput
              value={'2022-10-12T12:00'}
              id="interview-end"
              type="datetime-local"
              hasValue={false}
            />
          </StInputBox>
        </StInputWrapper>
      </StDateWrapper>
      <StDateWrapper>
        <StInputWrapper>
          <StInputBox>
            <StInputLabel htmlFor="final-result">최종 결과 발표</StInputLabel>
            <StInput
              value={'2022-10-12T12:00'}
              id="final-result"
              type="datetime-local"
              hasValue={false}
            />
          </StInputBox>
        </StInputWrapper>
      </StDateWrapper>
    </StWrapper>
  );
};

export default RecruitSchedule;
