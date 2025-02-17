import { MouseEvent, useState } from 'react';

const useModal = () => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const onInfoToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsInfoVisible((prev) => !prev);
  };

  return { isInfoVisible, onInfoToggle };
};

export default useModal;
