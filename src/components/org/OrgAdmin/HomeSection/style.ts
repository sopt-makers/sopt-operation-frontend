import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const StContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 80px;

  padding: 50px 0 270px 0;
`;

export const StHomeEditButtonWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 1;
`;

export const StSectionWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

export const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  width: 582px;
`;

export const StTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${fontsObject.TITLE_3_24_SB}
  color: ${colors.white};
`;

export const StTitleWithIcon = styled(StTitle)`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const StIcon = styled.button`
  color: ${colors.white};
  width: 20px;
  height: 20px;
`;

export const StInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  ${fontsObject.LABEL_3_14_SB};
  color: ${colors.white};

  cursor: pointer;
`;

export const StContentContainer = styled.div`
  display: flex;
  gap: 87px;
`;

export const StButtonFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > div {
    width: 338px;
  }
`;

export const StFirstSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 100%;
`;

export const StSecondSectionContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const StTextAreaContainer = styled.div`
  width: 582px;
`;

export const StImgWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 22px 32px;
  margin-top: 42px;

  border-radius: 12px;
  background-color: ${colors.gray900};
`;

export const StImgWrapperTitle = styled.div`
  display: flex;
  justify-content: space-between;

  padding-bottom: 16px;
`;

export const StDescription = styled.p`
  ${fontsObject.LABEL_3_14_SB};
  color: ${colors.gray300};

  padding-bottom: 6px;
`;

export const StDescription2 = styled.p`
  ${fontsObject.LABEL_4_12_SB};
  color: ${colors.gray300};

  padding-bottom: 14px;
`;

export const StImgTitle = styled(StTitle)`
  display: flex;
  align-items: center;
  gap: 8px;

  & > svg {
    width: 28px;
    height: 28px;
  }
`;

export const StChipsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  margin-bottom: 18px;
  margin-top: 24px;

  & > button {
    white-space: nowrap;
  }
`;

export const StNewsHeader = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 44px;

  & p {
    ${fontsObject.LABEL_3_14_SB};
    color: ${colors.gray300};
  }
`;

export const StNewsHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 6px;

  padding-bottom: 30px;

  & > h2 {
    ${fontsObject.TITLE_3_24_SB};
    color: ${colors.white};
    margin: 0;
  }
`;

export const StLeftColumnSection = styled.div`
  width: 582px;
`;

export const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StReviewList = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 12px;
  margin-top: 6px;
`;


export const StInfoButton = styled.button`
  color: ${colors.white};
  width: 20px;
`;

export const StReviewModalWrapper = styled.div`
  position: absolute;
  top: 100px;
  left: 650px;
`;

export const StNewsModalWrapper = styled.div`
  position: absolute;
  top: 100px;
  left: 650px;
`;
