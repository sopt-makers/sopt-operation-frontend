import { useMutation } from 'react-query';

import { sendData } from './api';

const useMutateSendData = () => {
  const { mutate: sendMutate, isLoading: sendIsLoading } = useMutation({
    mutationFn: (data) => sendData(data),
    onSuccess: (res, variables) => {
      const {
        coreValues,
        headerImage: headerImageURL,
        members,
        recruitHeaderImage: recruitHeaderImageURL,
      } = res.data;

      const coreValues1URL = coreValues[0].image;
      const coreValues2URL = coreValues[1].image;
      const coreValues3URL = coreValues[2].image;

      const member1URL = members[0].profileImage;
      const member2URL = members[1].profileImage;
      const member3URL = members[2].profileImage;
      const member4URL = members[3].profileImage;
      const member5URL = members[4].profileImage;
      const member6URL = members[5].profileImage;
      const member7URL = members[6].profileImage;
      const member8URL = members[7].profileImage;
      const member9URL = members[8].profileImage;
      const member10URL = members[9].profileImage;
      const member11URL = members[10].profileImage;
      const member12URL = members[11].profileImage;

      const { recruitHeaderImageFileName } = variables;

      console.log(coreValues, headerImageURL, members, recruitHeaderImageURL);
    },
  });

  return { sendMutate, sendIsLoading };
};

export default useMutateSendData;
