import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { IconImagePlus } from '@sopt-makers/icons';
import { HTMLAttributes, useRef } from 'react';

interface ImageInputProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const ImageInput = ({ label, description }: ImageInputProps) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    if (!ref.current) return;

    ref.current.onchange;
  };

  return (
    <StInputContainer>
      <StLabel aria-labelledby={label}>
        {label}
        <StRequiredIcon>*</StRequiredIcon>
      </StLabel>
      <StDescription>{description}</StDescription>

      <StImageLabel htmlFor={label}>
        <IconImagePlus color={colors.white} />
      </StImageLabel>
      <StImageInput type="file" accept="image/*" ref={ref} id={label} />
    </StInputContainer>
  );
};

export default ImageInput;

const StInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StLabel = styled.p`
  ${fontsObject.LABEL_3_14_SB};
  color: ${colors.white};
`;

const StRequiredIcon = styled.span`
  color: ${colors.secondary};
  margin-left: 4px;
`;

const StDescription = styled.p`
  ${fontsObject.LABEL_4_12_SB};
  color: ${colors.gray300};

  padding-bottom: 5px;
`;

const StImageLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 167px;
  height: 211px;

  border-radius: 10px;
  background-color: ${colors.gray800};

  cursor: pointer;

  & > svg {
    width: 24px;
    height: 24px;
  }
`;

const StImageInput = styled.input`
  display: none;
`;
