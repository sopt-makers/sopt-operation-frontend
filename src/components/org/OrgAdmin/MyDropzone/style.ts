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
  width: string;
  height: string;
  shape: 'square' | 'circle';
}

export const StImgButton = styled.div<StImgButtonProps>`
  ${fontsObject.BODY_4_13_M}

  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-top: 13px;
  color: ${colors.white};
  background-color: ${colors.gray800};
  border: ${({ isError }) => (isError ? `1px solid ${colors.error}` : 'none')};
  border-radius: ${({ shape }) => (shape === 'square' ? '10px' : '50%')};
  cursor: pointer;
  overflow: hidden;
`;

export const StImgIcon = styled(IconImagePlus)`
  width: 24px;
  height: 24px;
  color: ${colors.white};
`;

export const StImgPreview = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: contain;
  color: ${colors.white};
  border-radius: 10px;
`;
