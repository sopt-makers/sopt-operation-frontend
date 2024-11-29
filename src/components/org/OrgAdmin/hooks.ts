import { useMutation } from 'react-query';

import { sendData, sendDataConfirm, sendPresignedURL } from './api';

interface UseMutateSendDataProps {
  headerImageFile: File;
  coreValueImageFile1: File;
  coreValueImageFile2: File;
  coreValueImageFile3: File;
  memberImageFile1: File;
  memberImageFile2: File;
  memberImageFile3: File;
  memberImageFile4: File;
  memberImageFile5: File;
  memberImageFile6: File;
  memberImageFile7: File;
  memberImageFile8: File;
  memberImageFile9: File;
  memberImageFile10: File;
  memberImageFile11: File;
  memberImageFile12: File;
  recruitHeaderImageFile: File;
}

const useMutateSendData = ({
  headerImageFile,
  coreValueImageFile1,
  coreValueImageFile2,
  coreValueImageFile3,
  memberImageFile1,
  memberImageFile2,
  memberImageFile3,
  memberImageFile4,
  memberImageFile5,
  memberImageFile6,
  memberImageFile7,
  memberImageFile8,
  memberImageFile9,
  memberImageFile10,
  memberImageFile11,
  memberImageFile12,
  recruitHeaderImageFile,
}: UseMutateSendDataProps) => {
  const { mutate: sendMutate, isLoading: sendIsLoading } = useMutation({
    mutationFn: (data) => sendData(data),
    onSuccess: async (res: any) => {
      const {
        generation,
        coreValues,
        headerImage: headerImageURL,
        members,
        recruitHeaderImage: recruitHeaderImageURL,
      } = res.data;

      try {
        await Promise.all([
          sendPresignedURL(headerImageURL, headerImageFile),
          sendPresignedURL(coreValues[0].image, coreValueImageFile1),
          sendPresignedURL(coreValues[1].image, coreValueImageFile2),
          sendPresignedURL(coreValues[2].image, coreValueImageFile3),
          sendPresignedURL(members[0].profileImage, memberImageFile1),
          sendPresignedURL(members[1].profileImage, memberImageFile2),
          sendPresignedURL(members[2].profileImage, memberImageFile3),
          sendPresignedURL(members[3].profileImage, memberImageFile4),
          sendPresignedURL(members[4].profileImage, memberImageFile5),
          sendPresignedURL(members[5].profileImage, memberImageFile6),
          sendPresignedURL(members[6].profileImage, memberImageFile7),
          sendPresignedURL(members[7].profileImage, memberImageFile8),
          sendPresignedURL(members[8].profileImage, memberImageFile9),
          sendPresignedURL(members[9].profileImage, memberImageFile10),
          sendPresignedURL(members[10].profileImage, memberImageFile11),
          sendPresignedURL(members[11].profileImage, memberImageFile12),
          sendPresignedURL(recruitHeaderImageURL, recruitHeaderImageFile),
        ]);

        const finalResponse = await sendDataConfirm({ generation });

        return finalResponse;
      } catch (error) {
        console.error('Error: ', error);
      }
    },
  });

  return { sendMutate, sendIsLoading };
};

export default useMutateSendData;
