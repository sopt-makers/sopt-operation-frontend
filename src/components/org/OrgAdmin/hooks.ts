import { useMutation } from 'react-query';

import { sendData } from './api';

const useMutateSendData = () => {
  const { mutate: sendMutate, isLoading: sendIsLoading } = useMutation({
    mutationFn: (data) => sendData(data),
    onSuccess: (res) => console.log(res),
  });

  return { sendMutate, sendIsLoading };
};

export default useMutateSendData;
