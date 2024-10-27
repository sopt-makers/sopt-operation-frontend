import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { IconImage } from '@sopt-makers/icons';

export const StImgButton = styled.button`
  ${fontsObject.BODY_2_16_M}

  width: 547px;
  height: 166px;
  margin-top: 13px;
  color: ${colors.white};
  background-color: ${colors.gray800};
  border-radius: 10px;
`;

export const StImgIcon = styled(IconImage)`
  width: 24px;
  height: 24px;
  color: ${colors.white};
`;

export const StImgPreview = styled.img`
  max-width: 547px;
  height: 166px;
  color: ${colors.white};
  border-radius: 10px;
`;
