import React from 'react';

import {
  StCoreValueLogo,
  StMainTitleContainer,
  StSubTitleContainer,
  StTextFieldContainer,
  StTitleContainer,
  StTypography,
} from '@/components/orgAdmin/AboutTab/AboutTabManagement/CoreValueInput/style';
import ImageSelect from '@/components/orgAdmin/ImageSelect';
import TextField from '@/components/orgAdmin/TextField';

interface Props {
  image: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  subTitle: string;
  onHandleTitleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onHandleSubTitleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onRemoveImage: () => void;
}
export const CoreValueInput = ({
  title,
  subTitle,
  onHandleSubTitleChange,
  onHandleTitleChange,
  image,
  onChange,
  onRemoveImage,
}: Props) => {
  return (
    <StCoreValueLogo>
      <p>image (380 * 380)</p>
      <div className={'core_value_container'}>
        <div className={'core_value_logo_container'}>
          <ImageSelect
            image={image}
            onChange={onChange}
            onRemoveImage={onRemoveImage}
            width={380}
            height={380}
          />
        </div>
        <StTitleContainer>
          <StMainTitleContainer>
            <StTypography>Title</StTypography>
            <StTextFieldContainer>
              <TextField
                label={'ex.connection'}
                value={title}
                onChange={onHandleTitleChange}
                multiline={false}
              />
            </StTextFieldContainer>
          </StMainTitleContainer>
          <StSubTitleContainer>
            <StTypography>Sub Title</StTypography>
            <StTextFieldContainer>
              <TextField
                label={
                  'ex. 이해를 바탕으로 사람들과 소통하여 연결될 수 있는 사람'
                }
                value={subTitle}
                onChange={onHandleSubTitleChange}
                multiline
                height={'120px'}
              />
            </StTextFieldContainer>
          </StSubTitleContainer>
        </StTitleContainer>
      </div>
    </StCoreValueLogo>
  );
};
