import 'react-datepicker/dist/react-datepicker.css';

import { useState } from 'react';
import DatePicker from 'react-datepicker';

import Form from '@/components/common/Form';
import IcDropdown from '@/components/common/icons/IcDropDown';

import { StInput } from './style';

interface Props {
  formType: string;
}

const FormType = (props: Props) => {
  const { formType } = props;

  const [sessionName, setSessionName] = useState<string>();
  const [sessionLocation, setSessionLocation] = useState<string>();
  const [date, setDate] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    if (date) {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);

      const formattedDate = `${year}/${month}/${day}`;
      setDate(formattedDate);
    }
  };

  const handleForm = () => {
    switch (formType) {
      case 'name':
        return (
          <StInput
            placeholder="세션 이름을 입력해주세요"
            onChange={(e) => handleInputChange(e, '세션 이름')}
          />
        );
      case 'location':
        return (
          <StInput
            placeholder="세션이 열리는 장소를 입력해주세요"
            onChange={(e) => handleInputChange(e, '세션 장소')}
          />
        );
      case 'date':
        return (
          <>
            <DatePicker
              placeholderText="세션 날짜를 선택해주세요"
              dateFormat="yyyy/MM/dd"
              selected={selectedDate}
              onChange={handleDateChange}
            />
            <IcDropdown color={date ? '#3C3D40' : '#C0C5C9'} />
          </>
        );
    }
  };

  return <Form>{handleForm()}</Form>;
};

export default FormType;
