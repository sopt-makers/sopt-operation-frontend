import { ChangeEvent, useReducer } from 'react';

const reducer = <T>(state: T, action: EventTarget & HTMLInputElement): T => ({
  ...state,
  [action.name]: action.value,
});

const useInput = <T>(initValue: T) => {
  const [state, dispatch] = useReducer<
    React.Reducer<T, EventTarget & HTMLInputElement>
  >(reducer, initValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };

  return { state, onChange };
};

export default useInput;
