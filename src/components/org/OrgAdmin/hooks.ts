import { useToast } from '@sopt-makers/ui';
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

const useMutateSendData = (fileProps: UseMutateSendDataProps) => {
  const {
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
  } = fileProps;
  const { open } = useToast();
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
      ) {
        throw new Error('presigned url put 준비 과정에 에러가 발생함.');
      }
      try {
        if (Object.values(fileProps).some((file) => !(file instanceof File))) {
          alert(
            '이미지가 정상적으로 올라가지 않았어요.\n이미지를 다시 첨부하고 재배포해주세요.',
          );
          return;
        }
        // 필수 이미지 업로드
        const uploadPromises = [
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
          sendPresignedURL(recruitHeaderImageURL, recruitHeaderImageFile).catch(
            (err) => {
              console.error('지원하기 헤더 이미지 업로드 실패: ', err);
              throw err;
            },
          ),
        ];

        // 멤버 이미지는 있는 경우에만 업로드
        const memberImageFiles = [
          { url: members[0]?.profileImage, file: memberImageFile1, name: '회장' },
          { url: members[1]?.profileImage, file: memberImageFile2, name: '부회장' },
          { url: members[2]?.profileImage, file: memberImageFile3, name: '총무' },
          { url: members[3]?.profileImage, file: memberImageFile4, name: '운영 팀장' },
          { url: members[4]?.profileImage, file: memberImageFile5, name: '미디어 팀장' },
          { url: members[5]?.profileImage, file: memberImageFile6, name: '메이커스 팀장' },
          { url: members[6]?.profileImage, file: memberImageFile7, name: '기획 파트장' },
          { url: members[7]?.profileImage, file: memberImageFile8, name: '디자인 파트장' },
          { url: members[8]?.profileImage, file: memberImageFile9, name: '안드로이드 파트장' },
          { url: members[9]?.profileImage, file: memberImageFile10, name: 'iOS 파트장' },
          { url: members[10]?.profileImage, file: memberImageFile11, name: '웹 파트장' },
          { url: members[11]?.profileImage, file: memberImageFile12, name: '서버 파트장' },
        ];

        // 파일이 있는 멤버만 업로드 프로미스 추가
        memberImageFiles.forEach(({ url, file, name }) => {
          if (url && file instanceof File) {
            uploadPromises.push(
              sendPresignedURL(url, file).catch((err) => {
                console.error(`${name} 이미지 업로드 실패: `, err);
                throw err;
              })
            );
          }
        });

        await Promise.all(uploadPromises);

        const finalResponse = await sendDataConfirm({ generation });

        if (finalResponse.response.status === 201)
          open({
            icon: 'success',
            content: '성공적으로 배포했어요.',
          });

        return finalResponse;
      } catch (err) {
        console.error('최종 배포 실패: ', err);
      }
    },
  });

  return { sendMutate, sendIsLoading };
};

export default useMutateSendData;
