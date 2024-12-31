import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { HTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import MyDropZone from '../MyDropzone';

interface ImageInputProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

const ImageInput = ({ label, description }: ImageInputProps) => {
  const method = useFormContext();

  return (
    <StInputContainer>
      <StLabel aria-labelledby={label}>
        이미지
        <StRequiredIcon>*</StRequiredIcon>
      </StLabel>
      <StDescription>{description}</StDescription>

      <MyDropZone method={method} label={label} width="167px" height="211px" />
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
