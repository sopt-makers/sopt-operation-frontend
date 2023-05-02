import TextField from '@/components/orgAdmin/TextField';
import ImageSelect from '@/components/orgAdmin/ImageSelect';
import React from 'react';
import { StCoreValueLogo } from '@/components/orgAdmin/AboutTab/AboutTabManagement/CoreValueInput/style';

interface Props {
  image: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  subTitle: string;
  onHandleTitleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onHandleSubTitleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
      <div className={'core_value_container'}>
        <ImageSelect
          image={image}
          onChange={onChange}
          onRemoveImage={onRemoveImage}
        />
        <div style={{ height: '100%' }} className={'title_container'}>
          <p className={'text'}>Title</p>
          <div style={{ height: '25%' }} className={'text_field_container'}>
            <TextField
              label={'ex.connection'}
              value={title}
              onChange={onHandleTitleChange}
            />
          </div>

          <p className={'text'}>Sub Title</p>
          <div style={{ height: '70%' }} className={'text_field_container'}>
            <TextField
              label={
                'ex. 이해를 바탕으로 사람들과 소통하여 연결될 수 있는 사람'
              }
              value={subTitle}
              onChange={onHandleSubTitleChange}
              multiline
            />
          </div>
        </div>
      </div>
    </StCoreValueLogo>
  );
};
