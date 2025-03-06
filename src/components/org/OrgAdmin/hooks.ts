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
        // 필수 이미지 체크
        if (
          !(headerImageFile instanceof File) ||
          !(coreValueImageFile1 instanceof File) ||
          !(coreValueImageFile2 instanceof File) ||
          !(coreValueImageFile3 instanceof File) ||
          !(recruitHeaderImageFile instanceof File)
        ) {
          alert(
            '필수 이미지가 정상적으로 올라가지 않았어요.\n이미지를 다시 첨부하고 재배포해주세요.',
          );
          return;
        }

        // 멤버 이미지 중 최소 하나라도 있는지 체크
        const memberFiles = [
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
        ];

        // 존재하는 임원진 파일만 필터링
        const existMemberFiles = memberFiles.filter((file) => file);

        const hasAtLeastOneMember = memberFiles.some(
          (file) => file instanceof File,
        );

        if (!hasAtLeastOneMember) {
          alert('최소 한 명 이상의 멤버 정보를 입력해주세요.');
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
        const existMemberImageFiles = members.map(
          (member: { profileImage: string; role: string }, index: number) => ({
            url: member.profileImage,
            file: existMemberFiles[index],
            role: member.role,
          }),
        );

        // 파일이 있는 멤버만 업로드 프로미스 추가
        existMemberImageFiles.forEach(
          ({ url, file, role }: { url: string; file: File; role: string }) => {
            if (url && file instanceof File) {
              console.log(role);
              uploadPromises.push(
                sendPresignedURL(url, file).catch((err) => {
                  console.error(`${role} 이미지 업로드 실패: `, err);
                  throw err;
                }),
              );
            }
          },
        );

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
