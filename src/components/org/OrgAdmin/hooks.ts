import { useMutation } from 'react-query';

import {
  AddAdminRequestDto,
  AddAdminResponseDto,
} from '@/__generated__/org-types/data-contracts';

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
    mutationFn: (
      data: AddAdminRequestDto,
    ): Promise<AddAdminResponseDto | undefined> => sendData(data),
    onSuccess: async (res) => {
      const {
        generation,
        coreValues,
        headerImage: headerImageURL,
        members,
        recruitHeaderImage: recruitHeaderImageURL,
      } = res || {};

      if (
        !generation ||
        !coreValues ||
        !headerImageURL ||
        !members ||
        !recruitHeaderImageURL
      )
        return;

      try {
        await Promise.all([
          sendPresignedURL(headerImageURL, headerImageFile).catch((err) => {
            console.error('소개 헤더 이미지 업로드 실패: ', err);
            throw err;
          }),
          sendPresignedURL(coreValues[0].image, coreValueImageFile1).catch(
            (err) => {
              console.error('코어 밸류 1 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
          sendPresignedURL(coreValues[1].image, coreValueImageFile2).catch(
            (err) => {
              console.error('코어 밸류 2 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
          sendPresignedURL(coreValues[2].image, coreValueImageFile3).catch(
            (err) => {
              console.error('코어 밸류 3 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
          sendPresignedURL(members[0].profileImage, memberImageFile1).catch(
            (err) => {
              console.error('회장 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
          sendPresignedURL(members[1].profileImage, memberImageFile2).catch(
            (err) => {
              console.error('부회장 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
          sendPresignedURL(members[2].profileImage, memberImageFile3).catch(
            (err) => {
              console.error('총무 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
          sendPresignedURL(members[3].profileImage, memberImageFile4).catch(
            (err) => {
              console.error('운영 팀장 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
          sendPresignedURL(members[4].profileImage, memberImageFile5).catch(
            (err) => {
              console.error('미디어 팀장 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
          sendPresignedURL(members[5].profileImage, memberImageFile6).catch(
            (err) => {
              console.error('메이커스 팀장 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
          sendPresignedURL(members[6].profileImage, memberImageFile7).catch(
            (err) => {
              console.error('기획 파트장 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
          sendPresignedURL(members[7].profileImage, memberImageFile8).catch(
            (err) => {
              console.error('디자인 파트장 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
          sendPresignedURL(members[8].profileImage, memberImageFile9).catch(
            (err) => {
              console.error('안드로이드 파트장 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
          sendPresignedURL(members[9].profileImage, memberImageFile10).catch(
            (err) => {
              console.error('iOS 파트장 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
          sendPresignedURL(members[10].profileImage, memberImageFile11).catch(
            (err) => {
              console.error('웹 파트장 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
          sendPresignedURL(members[11].profileImage, memberImageFile12).catch(
            (err) => {
              console.error('서버 파트장 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
          sendPresignedURL(recruitHeaderImageURL, recruitHeaderImageFile).catch(
            (err) => {
              console.error('지원하기 헤더 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
        ]);

        const finalResponse = await sendDataConfirm({ generation });

        return finalResponse;
      } catch (err) {
        console.error('최종 배포 실패: ', err);
      }
    },
  });

  return { sendMutate, sendIsLoading };
};

export default useMutateSendData;
