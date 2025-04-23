import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { ComponentPropsWithoutRef } from 'react';

interface TagProps extends ComponentPropsWithoutRef<'div'> {
  color: string;
}

const BannerTag = ({ color, children, ...props }: TagProps) => {
  return (
    <StTag color={color} {...props}>
      {children}
    </StTag>
  );
};

export default BannerTag;

const StTag = styled.div<{ color: string }>`
  display: flex;

  width: fit-content;

  padding: 0.3rem 0.9rem;

  align-items: center;
  justify-content: center;
  gap: 1rem;

  border-radius: 10rem;

  ${fontsObject.LABEL_3_14_SB}

  color: ${colors.white};
  background-color: ${({ color }) => color};

  white-space: nowrap;
`;
