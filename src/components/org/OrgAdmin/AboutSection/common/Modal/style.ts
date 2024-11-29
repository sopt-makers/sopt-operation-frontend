import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

import zIndex from '@/utils/zIndex';

interface StInfoWrapperProps {
  isVisible: boolean;
}

export const StInfoWrapper = styled.article<StInfoWrapperProps>`
  position: relative;
  border-radius: 12px;
  padding: 22px 32px 38px;
  background-color: ${colors.gray900};
  transform: ${({ isVisible }) =>
    isVisible ? 'translateX(0)' : 'translateX(100%)'};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: all 0.5s ease-in-out;
  z-index: ${zIndex.modal};
`;

export const StInfoTitle = styled.h2`
  ${fontsObject.HEADING_4_24_B};

  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
  color: ${colors.gray10};

  & svg {
    width: 28px;
  }
`;

export const StInfoCloseButton = styled.button`
  position: absolute;
  right: 32px;
  top: 22px;
  ${fontsObject.HEADING_4_24_B};

  color: ${colors.gray10};
`;

export const StInfoDescription = styled.p`
  ${fontsObject.LABEL_3_14_SB};

  margin-bottom: 8px;
  color: ${colors.white};
`;

export const StInfoSubDescription = styled.p`
  ${fontsObject.LABEL_4_12_SB};

  margin-bottom: 14px;
  color: ${colors.gray300};
`;

export const StInfoImg = styled.img`
  color: ${colors.white};
`;
