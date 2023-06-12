import { useState } from 'react';

import Input from '@/components/common/Input';

const FormType = () => {
  const [sessionName, setSessionName] = useState<string>();
  const [sessionLocation, setSessionLocation] = useState<string>();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputType: string,
  ) => {
    const value = e.target.value;

    if (inputType === '세션 이름') {
      setSessionName(value);
    } else if (inputType === '세션 장소') {
      setSessionLocation(value);
    }
  };

  return (
    <Input>
      <input
        placeholder="세션 이름을 입력해주세요"
        onChange={(e) => handleInputChange(e, '세션 이름')}></input>
    </Input>
  );
};

export default FormType;
