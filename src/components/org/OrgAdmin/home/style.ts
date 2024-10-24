import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const StContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 80px;

  padding: 50px 0 270px 0;
`;

export const StForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

export const StTitle = styled.h2`
  ${fontsObject.TITLE_3_24_SB}
  margin-bottom: 6px;
  color: ${colors.white};
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
  align-items: end;
  gap: 31px;
`;

export const StTextAreaContainer = styled.div`
  width: 582px;
`;

export const StImgWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 22px 32px;

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
  color: ${colors.white};

  padding-bottom: 8px;
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

export const StNewsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const StNewsItem = styled.li`
  display: flex;
  justify-content: space-between;

  width: 100%;

  padding: 16px 30px;

  color: ${colors.gray30};
  ${fontsObject.TITLE_5_18_SB};

  border-radius: 10px;
  background-color: ${colors.gray800};

  & > svg {
    width: 24px;
    height: 24px;
  }
`;

export const StNewsSectionContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 31px;
`;
