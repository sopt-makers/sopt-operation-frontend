import TextField from '@/components/orgAdmin/TextField';
import ImageSelect from '@/components/orgAdmin/ImageSelect';
import React from 'react';
import { StCoreValueLogo } from '@/components/orgAdmin/AboutTab/AboutTabManagement/CoreValueInput/style';

interface Props {
  image: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref: React.RefObject<HTMLInputElement>;
}
export const CoreValueInput = ({ image, onChange, ref }: Props) => {
  return (
    <StCoreValueLogo>
      <div className={'core_value_container'}>
        <ImageSelect image={image} onChange={onChange} ref={ref} />
        <div style={{ height: '100%' }} className={'title_container'}>
          <p className={'text'}>Title</p>
          <div style={{ height: '40%' }} className={'text_field_container'}>
            <TextField label={'ex.connection'} />
          </div>

          <p className={'text'}>Sub Title</p>
          <div style={{ height: '70%' }} className={'text_field_container'}>
            <TextField
              label={
                'ex. 이해를 바탕으로 사람들과 소통하여 연결될 수 있는 사람'
              }
            />
          </div>
        </div>
      </div>
    </StCoreValueLogo>
  );
};
