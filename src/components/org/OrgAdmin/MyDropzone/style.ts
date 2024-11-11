import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { IconImagePlus } from '@sopt-makers/icons';

export const StImgButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface StImgButtonProps {
  isError: boolean;
}

export const StImgButton = styled.div<StImgButtonProps>`
  ${fontsObject.BODY_2_16_M}

  display: flex;
  align-items: center;
  justify-content: center;
  width: 547px;
  height: 166px;
  margin-top: 13px;
  color: ${colors.white};
  background-color: ${colors.gray800};
  border: ${({ isError }) => (isError ? `1px solid ${colors.error}` : 'none')};
  border-radius: 10px;
  cursor: pointer;
`;

export const StImgIcon = styled(IconImagePlus)`
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
