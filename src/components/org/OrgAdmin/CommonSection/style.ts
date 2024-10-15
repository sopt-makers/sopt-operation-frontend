import styled from '@emotion/styled';
import { fontsObject } from '@sopt-makers/fonts';

import theme from '@/styles/theme';

export const StContainer = styled.section`
  padding: 50px 0;
`;

export const StWrapper = styled.div`
  margin-bottom: 80px;
`;

export const StTitleWrapper = styled.div`
  margin-bottom: 30px;
`;

export const StTitle = styled.h2`
  ${fontsObject.TITLE_3_24_SB}

  margin-bottom: 6px;
  color: ${theme.color.grayscale.realwhite};
`;

export const StDescription = styled.p`
  ${fontsObject.LABEL_3_14_SB};

  color: ${theme.color.grayscale.gray300};
`;

export const StInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${theme.color.grayscale.realwhite};
`;

export const StInputLabel = styled.p`
  ${fontsObject.LABEL_3_14_SB};

  margin-bottom: 8px;
`;

export const StInput = styled.input`
  width: 338px;
  height: 48px;
  padding: 11px 16px;
  border: none;
  border-radius: 10px;
  background-color: ${theme.color.grayscale.gray800};

  &::placeholder {
    color: ${theme.color.grayscale.gray300};
  }
`;
