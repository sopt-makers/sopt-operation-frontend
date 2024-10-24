import { useState } from 'react';

export const useBooleanState = () => {
  const [flag, setFlag] = useState(false);

  const setTrue = () => {
    setFlag(true);
  };

  const setFalse = () => {
    setFlag(false);
  };

  const toggle = () => {
    setFlag((prev) => !prev);
  };

  return { flag, setTrue, setFalse, toggle };
};
